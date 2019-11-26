const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"sign2",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427957761326710805/render.jpg\">sign2</a>",
    process:async (req, res, param, endpoint) => {
        let sign2 = await fsn.readFile('./img/sign2.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(1280, 716)
          .setColor('#FFFFFF')
          .addRect(0, 0, 1280, 716)
          .fill()
          .addImage(incomingBuffer, 527, 119, 268, 208)
          .addImage(sign2, 0, 0, 1280, 716)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}