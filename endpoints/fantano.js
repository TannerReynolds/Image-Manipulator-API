const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"fantano",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427938527519703050/render.jpg\">fantano</a>",
    process:async (req, res, param, endpoint) => {
        let fantano = await fsn.readFile('./img/fantano.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(900, 507)
          .setColor('#FFFFFF')
          .addRect(0, 0, 900, 507)
          .fill()
          .addImage(incomingBuffer, 20, 20, 325, 328)
          .addImage(fantano, 0, 0, 900, 507)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}