const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"megawrong",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427949914589233152/render.jpg\">megawrong</a>",
    process:async (req, res, param, endpoint) => {
        let megawrong = await fsn.readFile('./img/megawrong.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(900, 506)
          .setColor('#FFFFFF')
          .addRect(0, 0, 900, 506)
          .fill()
          .addImage(incomingBuffer, 0, 0, 900, 506)
          .addImage(megawrong, 0, 0, 900, 506)  
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}