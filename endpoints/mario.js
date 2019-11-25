const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"mario",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427949436048769025/render.jpg\">mario</a>",
    process:async (req, res, param, endpoint) => {
        let mario = await fsn.readFile('./img/mario.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(468, 310)
          .setColor('#FFFFFF')
          .addRect(0, 0, 468, 310)
          .fill()
          .addImage(incomingBuffer, 170, 5, 165, 182)
          .addImage(mario, 0, 0, 468, 310)  
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}