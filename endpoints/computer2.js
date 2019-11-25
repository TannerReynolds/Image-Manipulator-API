const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"computer2",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427929240999297025/render.jpg\">computer2</a>",
    process:async (req, res, param, endpoint) => {
        let computer2 = await fsn.readFile('./img/computer2.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(880, 632)
          .setColor('#FFFFFF')
          .addRect(0, 0, 880, 632)
          .fill()
          .addImage(incomingBuffer, 134, 133, 318, 250)
          .addImage(computer2, 0, 0, 880, 632)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}