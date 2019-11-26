const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"jojo2",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427947904343212053/render.jpg\">jojo2</a>",
    process:async (req, res, param, endpoint) => {
        let jojo2 = await fsn.readFile('./img/jojo2.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(900, 506)
          .setColor('#FFFFFF')
          .addRect(0, 0, 900, 506)
          .fill()
          .addImage(incomingBuffer, 0, 0, 750, 506)
          .addImage(jojo2, 0, 0, 900, 506)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}