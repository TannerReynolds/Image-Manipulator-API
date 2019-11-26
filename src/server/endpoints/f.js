const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"f",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427932228375281665/render.jpg\">f</a>",
    process:async (req, res, param, endpoint) => {
        let f = await fsn.readFile('./img/f.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(540, 540)
          .setColor('#FFFFFF')
          .addRect(0, 0, 540, 540)
          .fill()
          .addImage(incomingBuffer, 86, 90, 79, 106)
          .addImage(f, 0, 0, 540, 540)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}