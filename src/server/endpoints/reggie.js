const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"reggie",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427954868108394496/render.jpg\">reggie</a>",
    process:async (req, res, params, endpoint) => {
        let reggie = await fsn.readFile(`${__dirname}/../assets/img/reggie.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(1000, 563)
          .setColor('#FFFFFF')
          .addRect(0, 0, 1000, 563)
          .fill()
          .addImage(incomingBuffer, 17, 15, 433, 351)
          .addImage(reggie, 0, 0, 1000, 563)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}