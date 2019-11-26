const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"paint2",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427951332935204886/render.jpg\">paint2</a>",
    process:async (req, res, param, endpoint) => {
        let paint2 = await fsn.readFile('./img/paint2.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(1024, 544)
          .setColor('#FFFFFF')
          .addRect(0, 0, 1024, 544)
          .fill()
          .addImage(incomingBuffer, 137, 74, 408, 338)
          .addImage(paint2, 0, 0, 1024, 544)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}