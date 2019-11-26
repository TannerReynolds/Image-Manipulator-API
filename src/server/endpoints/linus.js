const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"linus",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427948204424953856/render.jpg\">linus</a>",
    process:async (req, res, param, endpoint) => {
        let linus = await fsn.readFile('./img/linus.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(1366, 768)
          .setColor('#FFFFFF')
          .addRect(0, 0, 1366, 768)
          .fill()
          .addImage(incomingBuffer, 545, 64, 670, 403)
          .addImage(linus, 0, 0, 1366, 768)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}