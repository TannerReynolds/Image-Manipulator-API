const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"sign",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427957445894209537/render.jpg\">sign</a>",
    process:async (req, res, param, endpoint) => {
        let sign = await fsn.readFile('./img/sign.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(700, 525)
          .setColor('#FFFFFF')
          .addRect(0, 0, 700, 525)
          .fill()
          .addImage(incomingBuffer, 131, 22, 440, 338)
          .addImage(sign, 0, 0, 700, 525)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}