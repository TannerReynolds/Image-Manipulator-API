const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"computer",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427928919480598528/render.jpg\">computer</a>",
    process:async (req, res, param, endpoint) => {
        let computer = await fsn.readFile('./img/computer.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(741, 572)
          .setColor('#FFFFFF')
          .addRect(0, 0, 741, 572)
          .fill()
          .addImage(incomingBuffer, 104, 112, 316, 291)
          .addImage(computer, 0, 0, 741, 572)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}