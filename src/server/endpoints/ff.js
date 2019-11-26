const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"ff",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427938647594106881/render.jpg\">ff</a>",
    process:async (req, res, param, endpoint) => {
        let ff = await fsn.readFile('./img/ff.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(1280, 720)
          .setColor('#FFFFFF')
          .addRect(0, 0, 1280, 720)
          .fill()
          .addImage(incomingBuffer, 0, 0, 1280, 720)
          .addImage(ff, 0, 0, 1280, 720)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}