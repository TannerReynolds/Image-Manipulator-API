const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"wrongpic",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427967783058407434/render.jpg\">wrongpic</a>",
    process:async (req, res, param, endpoint) => {
        let wrongpic = await fsn.readFile('./img/wrongPic.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(659, 448)
          .setColor('#FFFFFF')
          .addRect(0, 0, 659, 448)
          .fill()
          .addImage(incomingBuffer, 114, 27, 484, 335)
          .addImage(wrongpic, 0, 0, 659, 448)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}