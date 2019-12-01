const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"squidward",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427958908397551616/render.jpg\">squidward</a>",
    process:async (req, res, params, endpoint) => {
        let squidward = await fsn.readFile(`${__dirname}/../assets/img/squidward.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(950, 556)
          .setColor('#FFFFFF')
          .addRect(0, 0, 950, 556)
          .fill()
          .addImage(incomingBuffer, 328, 0, 622, 556)
          .addImage(squidward, 0, 0, 950, 556)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}