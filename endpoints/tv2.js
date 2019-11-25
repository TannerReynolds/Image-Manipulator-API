const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"tv2",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427966365622730753/render.jpg\">tv2</a>",
    process:async (req, res, param, endpoint) => {
        let tv2 = await fsn.readFile('./img/tv2.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(480, 426)
          .setColor('#FFFFFF')
          .addRect(0, 0, 480, 426)
          .fill()
          .addImage(incomingBuffer, 225, 48, 137, 83)
          .addImage(tv2, 0, 0, 480, 426)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}