const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"gaben",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427941531392147477/render.jpg\">gaben</a>",
    process:async (req, res, param, endpoint) => {
        let gaben = await fsn.readFile('./img/gaben1.png');
        let gaben2 = await fsn.readFile('./img/gaben2.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(450, 338)
          .setColor('#FFFFFF')
          .addRect(0, 0, 450, 338)
          .fill()
          .addImage(gaben, 0, 0, 450, 338)
          .addImage(incomingBuffer, 240, 163, 111, 143)
          .addImage(gaben2, 0, 0, 450, 338)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}