const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"jack",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427947058457214997/render.jpg\">jack</a>",
    process:async (req, res, param, endpoint) => {
        let jack = await fsn.readFile('./img/jack.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(1024, 576)
          .setColor('#FFFFFF')
          .addRect(0, 0, 1024, 576)
          .fill()
          .addImage(incomingBuffer, 528, 155, 324, 247)
          .addImage(jack, 0, 0, 1024, 576)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}