const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"hitler",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427944153901432851/render.jpg\">hitler</a>",
    process:async (req, res, param, endpoint) => {
        let hitler = await fsn.readFile('./img/hitler.jpg');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(480, 360)
          .setColor('#FFFFFF')
          .addImage(hitler, 0, 0, 480, 360)
          .addImage(incomingBuffer, 44, 39, 144, 144)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}