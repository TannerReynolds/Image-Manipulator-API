const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"hagrid",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427943281721081896/render.jpg\">hagrid</a>",
    process:async (req, res, param, endpoint) => {
        let hagrid = await fsn.readFile('./img/hagrid.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(400, 797)
          .setColor('#FFFFFF')
          .addRect(0, 0, 400, 797)
          .fill()
          .addImage(incomingBuffer, 0, 266, 400, 265)
          .addImage(hagrid, 0, 0, 400, 797)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}