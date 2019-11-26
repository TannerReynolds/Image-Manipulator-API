const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"icarly",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427945291811913730/render.jpg\">icarly</a>",
    process:async (req, res, param, endpoint) => {
        let icarly = await fsn.readFile('./img/icarly.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(767, 594)
          .setColor('#FFFFFF')
          .addRect(0, 0, 767, 594)
          .fill()
          .addImage(incomingBuffer, 0, 0, 767, 594)
          .addImage(icarly, 0, 0, 767, 594)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}