const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"switch",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427965015895834624/render.jpg\">switch</a>",
    process:async (req, res, param, endpoint) => {
        let sw = await fsn.readFile('./img/switch.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(852, 960)
          .setColor('#FFFFFF')
          .addRect(0, 0, 852, 960)
          .fill()
          .addImage(incomingBuffer, 61, 518, 622, 385)
          .addImage(sw, 0, 0, 852, 960)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}