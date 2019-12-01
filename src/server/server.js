/* eslint-disable consistent-return */
const express = require('express');
const fs = require('fs-extra');

const app = express();
const bodyParser = require('body-parser');
const Eris = require('eris');
const path = require('path');

const utils = require(`${__dirname}/../util`);
const https = require('https');

const events = require(`${__dirname}/../bot/events`);
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
const helmet = require('helmet');

/** Express Webserver Class */
class ImageProcessor {
    /**
   * Starting server and bot, handling routing, and middleware
   * @param {object} c - configuration json file
   */
    constructor(c) {
        this.db = db;
        /** Setting LowDB Defaults */
        db.defaults({
            bans: [],
            users: [],
        })
            .write();
        /** Defintions */
        this.utils = utils;
        this.log = utils.log;
        this.auth = utils.auth;
        this.endpoints = [];
        this.loadEndpoints();
        this.c = c;
        this.c.discordToken && this.c.discordToken !== undefined && this.c.discrdToken !== null
            ? this.runDiscordBot()
            : this.log.verbose('No Discord Token provided...\nContinuing without Discord connection...');
        this.app = app;
        this.app.use(helmet());
        this.app.use(bodyParser.text());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));


        /** Checking to see if IP is banned */
        this.app.use((req, res, next) => {
            const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
            const exists = this.db.get('bans').find({ ip: userIP }).value();
            if (exists === undefined) { // if a ban was not found, then it will move on
                next();
            } else {
                res.statusCode = 401;
                res.write('This IP has been banned from the API');
                return res.end();
            }
        });
        /** Set to place IPs in temporarily for ratelimiting uploads */
        const ratelimited = new Set();
        this.app.use((req, res, next) => {
            if (req.method === 'POST') {
                const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
                if (ratelimited.has(userIP)) {
                    res.statusCode = 429;
                    res.write('Error 429: Ratelimited');
                    return res.end();
                }
                next(); // Move on if IP is not in ratelimited set
                ratelimited.add(userIP);
                // delete IP from ratelimit set after time specified in config.json
                setTimeout(() => ratelimited.delete(userIP), c.ratelimit);
            } else {
                next(); // move on if request type is not POST
            }
        });

        // All files in /uploads/ are publicly accessible via http
        this.app.use(express.static(`${__dirname}/public/`, {
            extensions: ["css", "html", "js"],
        }));

        this.app.get("/", () => {
            res.setHeader("Content-Type", "text/html");
            res.write(fs.readFileSync(`${__dirname}/public/index.html`));
            res.end();
        });

        this.app.get("/*", async (req, res) => {
          let params = req.query
          let path = req.path.split('/')[1]
          if(path.includes('?')) path = path.split('?')[0]
          console.log(path)
            for(let i = 0; i < this.endpoints.length; i++) {
              if(this.endpoints[i].endpoint === path) {
                res.statusCode = 200
                await this.endpoints[i].process(req, res, params, path)
              } else if(i === this.endpoints.length - 1) {
                  res.statusCode = 404  
                  res.write('Error 404: Endpoint not found.')
                  return res.end();
              }
            }
        })
        
        this.startServer();
    }

    /** Booting up the Discord Bot
   * @returns {void}
   */
    async runDiscordBot() {
        this.bot = new Eris(this.c.discordToken, {
            maxShards: 'auto',
        });
        this.log.verbose('Connecting to Discord...');
        this.commands = [];
        this.loadCommands();
        this.bot
            .on('messageCreate', events.messageCreate.bind(this))
            .on('ready', events.ready.bind(this));
        this.bot.connect();
    }

    /** Loads the commands for the discord bot to use in /bot/commands
   * into an array defined before the calling of this function
   * @returns {void}
   */
    async loadCommands() {
        fs.readdir(`${__dirname}/../bot/commands`, (err, files) => {
        /** Commands are pushed to an array */
            files.forEach(file => {
                if (file.toString().includes('.js')) {
                    // eslint-disable-next-line global-require
                    this.commands.push(require(`${__dirname}/../bot/commands/${file.toString()}`));
                    this.log.verbose(`Loaded Command: ${file.toString()}`);
                }
            });
        });
    }

    async loadEndpoints() {
        fs.readdir(`${__dirname}/endpoints`, (err, files) => {
            files.forEach(file => {
                if (file.toString().includes('.js')) {
                    // eslint-disable-next-line global-require
                    this.endpoints.push(require(`${__dirname}/endpoints/${file.toString()}`));
                    this.log.verbose(`Loaded Endpoint: ${file.toString()}`);
                }
            });
        });
    }

    /** Start's the Express server
   * @returns {void}
   */
    async startServer() {
        if (this.c.secure) {
        /** if the secure option is set to true in config,
         *  it will boot in https so long as it detects
         *  key.pem and cert.pem in the src directory
         */
            if (fs.existsSync(`${__dirname}/../key.pem`) && fs.existsSync(`${__dirname}/../cert.pem`)) {
                const privateKey = fs.readFileSync(`${__dirname}/../key.pem`);
                const certificate = fs.readFileSync(`${__dirname}/../cert.pem`);
                https.createServer({
                    key: privateKey,
                    cert: certificate,
                }, this.app).listen(this.c.securePort, '0.0.0.0');
            } else {
            // CF Flexible SSL
            /** if no key & cert pem files are detected,
             * it will still run in secure mode (returning urls with https)
             * so that it's compatible with CF flexible SSL
             * and SSL configurations via a reverse proxy */
                this.app.listen(this.c.securePort, '0.0.0.0', () => {
                    this.log.warning('Server using flexible SSL secure setting\nTo run a full SSL setting, ensure key.pem and cert.pem are in the /src folder');
                });
            }
            this.log.success(`Secure server listening on port ${this.c.securePort}`);
        } else {
            this.app.listen(this.c.port, '0.0.0.0', () => {
                this.log.success(`Server listening on port ${this.c.port}`);
            });
        }
    }
}

module.exports = ImageProcessor;