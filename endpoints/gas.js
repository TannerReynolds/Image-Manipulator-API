const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"gas",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427942162357813249/render.jpg\">gas</a>",
    process:async (req, res, param, endpoint) => {
        let gas = await fsn.readFile('./img/gas1.png');
        let gas2 = await fsn.readFile('./img/gas2.png');
        let gas3 = await fsn.readFile('./img/gas3.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(429, 540)
          .setColor('#FFFFFF')
          .addRect(0, 0, 429, 540)
          .fill()
          .addImage(gas, 0, 0, 429, 540)
          .addImage(incomingBuffer, 104, 99, 226, 179)
          .addImage(gas2, 0, 0, 429, 540)
          .addImage(gas3, 0, 0, 429, 540)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}