const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"deku",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427930450724651009/render.jpg\">deku</a>",
    process:async (req, res, param, endpoint) => {
        let deku = await fsn.readFile('./img/deku.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(1000, 563)
          .setColor('#FFFFFF')
          .addRect(0, 0, 1000, 563)
          .fill()
          .addImage(incomingBuffer, 42, 32, 850, 451)
          .addImage(deku, 0, 0, 1000, 563)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}