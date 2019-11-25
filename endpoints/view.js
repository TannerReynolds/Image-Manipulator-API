const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"view",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427966872537923585/render.jpg\">view</a>",
    process:async (req, res, param, endpoint) => {
        let view = await fsn.readFile('./img/view.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(505, 629)
          .setColor('#FFFFFF')
          .addRect(0, 0, 505, 629)
          .fill()
          .addImage(incomingBuffer, 19, 50, 464, 472)
          .addImage(view, 0, 0, 505, 629)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}