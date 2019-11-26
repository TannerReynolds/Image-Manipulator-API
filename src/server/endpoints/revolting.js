const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"revolting",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427955567328362496/render.jpg\">revolting</a>",
    process:async (req, res, param, endpoint) => {
        let revolting = await fsn.readFile('./img/revolting.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(906, 699)
          .setColor('#FFFFFF')
          .addRect(0, 0, 906, 699)
          .fill()
          .addImage(incomingBuffer, 580, 76, 189, 196)
          .addImage(revolting, 0, 0, 906, 699)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}