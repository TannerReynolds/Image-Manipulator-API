const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"sign3",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427958046875058176/render.jpg\">sign3</a>",
    process:async (req, res, params, endpoint) => {
        let sign3 = await fsn.readFile(`${__dirname}/../assets/img/sign3.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(679, 546)
          .setColor('#FFFFFF')
          .addRect(0, 0, 679, 546)
          .fill()
          .addImage(incomingBuffer, 150, 258, 361, 260)
          .addImage(sign3, 0, 0, 679, 546)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}