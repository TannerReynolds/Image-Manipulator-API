const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"paint",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427951050075406336/render.jpg\">paint</a>",
    process:async (req, res, param, endpoint) => {
        let paint = await fsn.readFile('./img/paint.jpg');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(680, 381)
          .setColor('#FFFFFF')
          .addRect(0, 0, 680, 381)
          .fill()
          .addImage(paint, 0, 0, 680, 381)
          .addImage(incomingBuffer, 313, 116, 300, 233)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}