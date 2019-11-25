const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"wrong",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427967441822547979/render.jpg\">wrong</a>",
    process:async (req, res, param, endpoint) => {
        let wrong = await fsn.readFile('./img/wrong.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(439, 586)
          .setColor('#FFFFFF')
          .addRect(0, 0, 439, 586)
          .fill()
          .addImage(incomingBuffer, 0, 0, 439, 342)
          .addImage(wrong, 0, 0, 439, 586)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}