const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"drakeandjosh",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427929636609982464/render.jpg\">drakeandjosh</a>",
    process:async (req, res, params, endpoint) => {
        let drakeandjosh = await fsn.readFile(`${__dirname}/../assets/img/d&j.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(800, 600)
          .setColor('#FFFFFF')
          .addRect(0, 0, 800, 600)
          .fill()
          .addImage(incomingBuffer, 0, 0, 800, 600)
          .addImage(drakeandjosh, 0, 0, 800, 600)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}