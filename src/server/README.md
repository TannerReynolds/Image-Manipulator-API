# HIPS
Havana Image Processing Server: The server application used in the Havana Discord bot to generate images based in input from the bot

### Requirements
 * [Nodejs](https://nodejs.org/en/)
 * [Canvas](https://www.npmjs.com/package/canvas)
 * [Graphics Magick](http://www.graphicsmagick.org/)

### Installation (Ubuntu 16.04)

#### Nodejs
```bash
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs
```
#### Graphics Magick
```bash
sudo apt-get install python-software-properties
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:rwky/graphicsmagick
sudo apt-get update
sudo apt-get install graphicsmagick
```

#### Canvas Deps
```bash
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

#### NPM Modules (In app's main dir)
```bash
npm i
```