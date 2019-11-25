const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"odyssey",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427950765185695744/render.jpg\">odyssey</a>",
    process:async (req, res, param, endpoint) => {
        let odyssey = await fsn.readFile('./img/odyssey.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(1280, 720)
          .setColor('#FFFFFF')
          .addRect(0, 0, 1280, 720)
          .fill()
          .addImage(incomingBuffer, 0, 0, 1280, 720)
          .addImage(odyssey, 0, 0, 1280, 720)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}