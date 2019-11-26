const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"jojo",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427947569386356736/render.jpg\">jojo</a>",
    process:async (req, res, param, endpoint) => {
        let jojo = await fsn.readFile('./img/jojo.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(1366, 768)
          .setColor('#FFFFFF')
          .addRect(0, 0, 1366, 768)
          .fill()
          .addImage(incomingBuffer, 0, 0, 1029, 768)
          .addImage(jojo, 0, 0, 1366, 768)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}