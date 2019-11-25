const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"hero",
    example: "N/a",
    process:async (req, res, param, endpoint) => {
        let hero = await fsn.readFile('./img/hero.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(720, 576)
          .setColor('#FFFFFF')
          .addRect(347, 301, 373, 275)
          .fill()
          .addImage(incomingBuffer, 347, 301, 373, 275)
          .addImage(hero, 0, 0, 720, 576)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}