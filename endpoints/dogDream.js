const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"dogdream",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427931436100747274/render.jpg\">dogdream</a>",
    process:async (req, res, param, endpoint) => {
        let dogdream = await fsn.readFile('./img/dogdream.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(307, 300)
          .setColor('#FFFFFF')
          .addRect(0, 0, 307, 300)
          .fill()
          .addImage(incomingBuffer, 42, 0, 170, 115)
          .addImage(dogdream, 0, 0, 307, 300)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}