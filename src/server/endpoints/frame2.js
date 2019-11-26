const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"frame2",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427940813125976078/render.jpg\">frame2</a>",
    process:async (req, res, param, endpoint) => {
        let frame2 = await fsn.readFile('./img/frame2.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(530, 800)
          .setColor('#FFFFFF')
          .addRect(0, 0, 530, 800)
          .fill()
          .addImage(incomingBuffer, 58, 380, 90, 123)
          .addImage(frame2, 0, 0, 530, 800)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}