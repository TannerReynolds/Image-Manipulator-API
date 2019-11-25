const express = require("express")
const fs = require("fs")
const app = express()
const bodyParser = require("body-parser")
const c = require("./config.json")
const Eris = require("eris")
const bot = new Eris(c.discordToken, { maxShards: "auto", getAllUsers: true })
const https = require("https")
let endpoints = []
let commands = []

// APP SETTINGS
app.use(bodyParser.text())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("X-Powered-By", "Qoilo API")
  next()
})

let privateKey = fs.readFileSync("key.pem");
let certificate = fs.readFileSync("cert.pem");



loadEndpoints(false) // Loading endpoints: False means its not a reload

// DISCORD BOT SETUP
let monitorChannel = null
if(c.discordToken && c.discordToken !== undefined && c.discrdToken !== null) { // If there is a discord token then it'll do bot stuff
  
  console.log("Connecting to Discord...")
  
  loadCommands(false) // Loading commands. false meaning its not a reload
  
  let prefix = c.prefix
  
  bot.on("ready", () => {
    console.log("Discord API monitor successfully logged in")
    monitorChannel = c.discordChannelID
  })
  
  bot.on("messageCreate", async msg => {
    
    // Command and Args declaration
    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toString().toLowerCase()

    // Initial Checks
    if(!c.discordAdminIDs.includes(msg.author.id)) return
    if(msg.content.indexOf(prefix) !== 0) return
    
    // Reload command that reloads pretty much everything
    if(command === "reload") {
      msg.channel.createMessage("Reloading...")
      commands = []
      endpoints = []
      loadEndpoints(true)
      loadCommands(true) // True means that it is a reload
    }

    // Goes through the commands and executes them if it matches input
    for(const c of commands) {
      if(c.command === command) {
        await c.execute(bot, msg, args, commands, prefix)
        break
      }
    }
  })
} else {
  console.log("No Discord Token provided...\nContinuing without Discord connection...") // API will still run without a discord token
}

app.use(express.static("./pages/", {
  extensions: [ "html", "css", "js" ],
}))

// INDEX
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html")
  res.write(fs.readFileSync("./pages/index.html"))
  res.end()
})

let ratelimited = new Set()
app.use((req, res, next) => {
  let userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
  if(ratelimited.has(userIP)) {
    res.statusCode = 429
    res.write("You are being ratelimited.")
    return res.end()
  } else {
    ratelimited.add(userIP)
    setTimeout(() => ratelimited.delete(userIP), c.ratelimit)
    next()
  }
})


app.get("/imgen", async (req, res) => {
  // Example: http://api.qoilo.com/imgen?effect=ajit&url=http://qoilo.com/yf0pjk
  let param = req.query.url // ?url=image url
  let endpoint = req.query.effect // ?effect=effect to be applied to given image
  if(!endpoint) {
    res.setHeader("Content-Type", "text/html")
    res.statusCode = 404
    res.write("404") // Displays 404
    return res.end() 
  }
    for(const e of endpoints) {
      if(e.endpoint === endpoint) {
        res.statusCode = 200
        await e.process(req, res, param, endpoint)
      }
    }
})

app.get("/printer", async (req, res) => {
  let param = req.query.url // ?url=image url
  for(const e of endpoints) {
    if(e.endpoint === "printer") {
      await e.process(req, res, param)
    }
  }
})

function loadEndpoints(reload) {
    fs.readdir("./endpoints/", (err, files) => {
      files.forEach(file => {
        if(file.toString().includes(".js")) {
          if(!reload) {
            endpoints.push(require(`./endpoints/${file.toString()}`))
            console.log(`Endpoint Loaded: ${file.toString()}`)
          } else {
            delete require.cache[require.resolve(`./endpoints/${file.toString()}`)]
            endpoints.push(require(`./endpoints/${file.toString()}`))
            console.log(`Endpoint Loaded: ${file.toString()}`)
          }
        }
      })
    })
}
function loadCommands(reload) {
    fs.readdir("./commands/", (err, files) => {
        files.forEach(file => {
          if(!reload) {
            commands.push(require(`./commands/${file.toString()}`))
            console.log(`Command Loaded: ${file.toString()}`)
          } else {
            delete require.cache[require.resolve(`./commands/${file.toString()}`)]
            commands.push(require(`./commands/${file.toString()}`))
            console.log(`Command Loaded: ${file.toString()}`)
          }
        })
      }) 
}

app.listen(80, () => {
  console.log("API listening on port 80")
  if(c.discordToken && c.discordToken !== undefined && c.discrdToken !== null) {
    bot.connect()
  }
})
https.createServer({
  key: privateKey,
  cert: certificate
}, app).listen(443);

process.on("unhandledRejection", e => console.log(`unhandledRejection\n${e}`) )
process.on("uncaughtException", e => console.log(`uncaughtException\n${e}`) )