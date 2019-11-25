const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"vr",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427967188792639509/render.jpg\">vr</a>",
    process:async (req, res, param, endpoint) => {
        let vr = await fsn.readFile('./img/vr.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(604, 711)
          .setColor('#FFFFFF')
          .addRect(0, 0, 604, 711)
          .fill()
          .addImage(incomingBuffer, 19, 356, 568, 335)
          .addImage(vr, 0, 0, 604, 711)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}