const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"flashback",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427939509997666305/render.jpg\">flashback</a>",
    process:async (req, res, param, endpoint) => {
        let flashback = await fsn.readFile('./img/vietnam.jpg');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(768, 535)
          .setColor('#FFFFFF')
          .addRect(0, 0, 768, 535)
          .fill()
          .addImage(incomingBuffer, 0, 0, 768, 535)
          .setGlobalAlpha(0.4)
          .addImage(flashback, 0, 0, 768, 535)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}