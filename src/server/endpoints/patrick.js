const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"patrick",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427952426948231178/render.jpg\">patrick</a>",
    process:async (req, res, param, endpoint) => {
        let patrick = await fsn.readFile('./img/patrick.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(485, 1136)
          .setColor('#FFFFFF')
          .addRect(0, 0, 485, 1136)
          .fill()
          .addImage(incomingBuffer, 90, 402, 308, 333)
          .addImage(patrick, 0, 0, 485, 1136)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}