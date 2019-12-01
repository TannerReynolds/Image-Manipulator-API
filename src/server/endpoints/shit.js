const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"shit",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427957245079322655/render.jpg\">shit</a>",
    process:async (req, res, params, endpoint) => {
        let shit = await fsn.readFile(`${__dirname}/../assets/img/shit.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(680, 962)
          .setColor('#FFFFFF')
          .addRect(0, 0, 680, 962)
          .fill()
          .addImage(shit, 0, 0, 680, 962)
          .addImage(incomingBuffer, 221, 653, 141, 141)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}