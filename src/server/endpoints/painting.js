const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"painting",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427952114476515339/render.jpg\">painting</a>",
    process:async (req, res, params, endpoint) => {
        let painting = await fsn.readFile(`${__dirname}/../assets/img/painting.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(800, 396)
          .setColor('#FFFFFF')
          .addRect(0, 0, 800, 396)
          .fill()
          .addImage(incomingBuffer, 303, 78, 218, 278)
          .addImage(painting, 0, 0, 800, 396)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}