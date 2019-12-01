const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"icarly",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427945291811913730/render.jpg\">icarly</a>",
    process:async (req, res, params, endpoint) => {
        let icarly = await fsn.readFile(`${__dirname}/../assets/img/icarly.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(767, 594)
          .setColor('#FFFFFF')
          .addRect(0, 0, 767, 594)
          .fill()
          .addImage(incomingBuffer, 0, 0, 767, 594)
          .addImage(icarly, 0, 0, 767, 594)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}