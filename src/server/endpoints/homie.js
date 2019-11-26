const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"homie",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427944569888440320/render.jpg\">homie</a>",
    process:async (req, res, param, endpoint) => {
        let homie = await fsn.readFile('./img/homie.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(534, 399)
          .setColor('#FFFFFF')
          .addRect(0, 0, 534, 399)
          .fill()
          .addImage(incomingBuffer, 0, 0, 534, 399)
          .addImage(homie, 0, 0, 534, 399)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}