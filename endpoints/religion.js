const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"religion",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427955195868086282/render.jpg\">religion</a>",
    process:async (req, res, param, endpoint) => {
        let religion = await fsn.readFile('./img/religion.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(960, 815)
          .setColor('#FFFFFF')
          .addRect(0, 0, 960, 815)
          .fill()
          .addImage(incomingBuffer, 26, 210, 767, 594)
          .addImage(religion, 0, 0, 960, 815)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}