const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"happydog",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427943654057967616/render.jpg\">happydog</a>",
    process:async (req, res, param, endpoint) => {
        let happydog = await fsn.readFile('./img/happydog.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(400, 402)
          .setColor('#FFFFFF')
          .addRect(0, 0, 400, 402)
          .fill()
          .addImage(incomingBuffer, 10, 91, 123, 101)
          .addImage(happydog, 0, 0, 400, 402)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}