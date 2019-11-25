const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"toys",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427965839971581952/render.jpg\">toys</a>",
    process:async (req, res, param, endpoint) => {
        let toys = await fsn.readFile('./img/toys.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(572, 746)
          .setColor('#FFFFFF')
          .addRect(0, 0, 572, 746)
          .fill()
          .addImage(incomingBuffer, 15, 200, 542, 470)
          .addImage(toys, 0, 0, 572, 746)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}