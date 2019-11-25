const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"damnyou",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427929964499697665/render.jpg\">damnyou</a>",
    process:async (req, res, param, endpoint) => {
        let damnyou = await fsn.readFile('./img/damnYou.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(1000, 563)
          .setColor('#FFFFFF')
          .addRect(0, 0, 1000, 563)
          .fill()
          .addImage(incomingBuffer, 220, 0, 715, 563)
          .addImage(damnyou, 0, 0, 1000, 563)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}