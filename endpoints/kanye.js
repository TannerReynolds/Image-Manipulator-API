const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"kanye",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427927587877290004/render.jpg\">kanye</a>",
    process:async (req, res, param, endpoint) => {
        let kanye = await fsn.readFile('./img/kanye.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(940, 627)
          .setColor('#FFFFFF')
          .addRect(0, 0, 940, 627)
          .fill()
          .addImage(incomingBuffer, 381, 332, 382, 329)
          .addImage(book, 0, 0, 940, 627)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}