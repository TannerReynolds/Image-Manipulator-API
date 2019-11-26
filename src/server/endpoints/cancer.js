const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"cancer",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427928054254403614/render.jpg\">cancer</a>",
    process:async (req, res, param, endpoint) => {
        let cancer = await fsn.readFile('./img/cancer.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(900, 893)
          .setColor('#FFFFFF')
          .addRect(0, 0, 900, 893)
          .fill()
          .addImage(incomingBuffer, 252, 489, 396, 396)
          .addImage(cancer, 0, 0, 900, 893)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}