const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"paint3",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427951651270295553/render.jpg\">paint3</a>",
    process:async (req, res, param, endpoint) => {
        let paint3 = await fsn.readFile('./img/paint3.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(420, 503)
          .setColor('#FFFFFF')
          .addRect(0, 0, 420, 503)
          .fill()
          .addImage(incomingBuffer, 14, 48, 309, 237)
          .addImage(paint3, 0, 0, 420, 503)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}