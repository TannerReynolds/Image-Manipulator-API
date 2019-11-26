const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"gay",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427942545352425473/render.jpg\">gay</a>",
    process:async (req, res, param, endpoint) => {
        let gay = await fsn.readFile('./img/gay.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(768, 768)
          .setColor('#FFFFFF')
          .addRect(0, 0, 768, 768)
          .fill()
          .addImage(incomingBuffer, 0, 0, 768, 768)
          .setGlobalAlpha(0.4)
          .addImage(gay, 0, 0, 768, 768)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}