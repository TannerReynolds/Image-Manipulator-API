const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"look",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427949018304348171/render.jpg\">look</a>",
    process:async (req, res, param, endpoint) => {
        let look = await fsn.readFile('./img/what.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(719, 530)
          .setColor('#FFFFFF')
          .addRect(0, 0, 719, 530)
          .fill()
          .addImage(incomingBuffer, 256, 19, 373, 418)
          .addImage(look, 0, 0, 719, 530)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}