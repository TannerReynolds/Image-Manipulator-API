const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"powerpoint",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427953844526514176/render.jpg\">powerpoint</a>",
    process:async (req, res, param, endpoint) => {
        let powerpoint = await fsn.readFile('./img/powerpoint.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(640, 360)
          .setColor('#FFFFFF')
          .addRect(0, 0, 640, 360)
          .fill()
          .addImage(incomingBuffer, 3, 44, 323, 190)
          .addImage(powerpoint, 0, 0, 640, 360)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}