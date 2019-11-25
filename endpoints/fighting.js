const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"fighting",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427938760915812362/render.jpg\">fighting</a>",
    process:async (req, res, param, endpoint) => {
        let fighting = await fsn.readFile('./img/fighting.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(500, 759)
          .setColor('#FFFFFF')
          .addRect(0, 0, 500, 759)
          .fill()
          .addImage(incomingBuffer, 179, 416, 123, 140)
          .addImage(fighting, 0, 0, 500, 759)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}