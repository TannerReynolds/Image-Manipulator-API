const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"who",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427967356493627394/render.jpg\">who</a>",
    process:async (req, res, param, endpoint) => {
        let who = await fsn.readFile('./img/who.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(900, 896)
          .setColor('#FFFFFF')
          .addRect(0, 0, 900, 896)
          .fill()
          .addImage(incomingBuffer, 0, 187, 900, 515)
          .addImage(who, 0, 0, 900, 896)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}