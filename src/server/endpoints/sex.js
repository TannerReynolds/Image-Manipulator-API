const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"sex",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427956669734191105/render.jpg\">sex</a>",
    process:async (req, res, param, endpoint) => {
        let sex = await fsn.readFile('./img/sex.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(820, 638)
          .setColor('#FFFFFF')
          .addRect(0, 0, 820, 638)
          .fill()
          .addImage(incomingBuffer, 0, 0, 527, 638)
          .addImage(sex, 0, 0, 820, 638)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}