const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"gimp",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427943016125431808/render.jpg\">gimp</a>",
    process:async (req, res, param, endpoint) => {
        let gimp = await fsn.readFile('./img/gimp1.png');
        let gimp2 = await fsn.readFile('./img/gimp2.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(650, 531)
          .setColor('#FFFFFF')
          .addImage(gimp, 0, 0, 650, 531)
          .addImage(incomingBuffer, 12, 37, 625, 465)
          .addImage(gimp2, 15, 370, 260, 127)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}