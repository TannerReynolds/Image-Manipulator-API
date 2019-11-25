const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"plane",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427953452585451520/render.jpg\">plane</a>",
    process:async (req, res, param, endpoint) => {
        let plane = await fsn.readFile('./img/plane.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(736, 1103)
          .setColor('#FFFFFF')
          .addRect(0, 0, 736, 1103)
          .fill()
          .addImage(incomingBuffer, 0, 109, 736, 821)
          .addImage(plane, 0, 0, 736, 1103)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}