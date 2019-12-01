const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"logan",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427948582461505546/render.jpg\">logan</a>",
    process:async (req, res, params, endpoint) => {
        let logan = await fsn.readFile(`${__dirname}/../assets/img/logan.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(689, 493)
          .setColor('#FFFFFF')
          .addRect(0, 0, 689, 493)
          .fill()
          .addImage(incomingBuffer, 0, 0, 689, 493)
          .addImage(logan, 0, 0, 689, 493)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}