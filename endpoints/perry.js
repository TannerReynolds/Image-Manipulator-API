const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"perry",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427952749259259920/render.jpg\">perry</a>",
    process:async (req, res, param, endpoint) => {
        let perry = await fsn.readFile('./img/perry.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(1920, 1080)
          .setColor('#FFFFFF')
          .addRect(0, 0, 1920, 1080)
          .fill()
          .addImage(incomingBuffer, 502, 26, 790, 525)
          .addImage(perry, 0, 0, 1920, 1080)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}