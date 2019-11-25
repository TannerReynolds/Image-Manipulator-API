const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"book",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427927587877290004/render.jpg\">book</a>",
    process:async (req, res, param, endpoint) => {
        let book = await fsn.readFile('./img/book.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(351, 575)
          .setColor('#FFFFFF')
          .addRect(0, 0, 351, 575)
          .fill()
          .addImage(incomingBuffer, 57, 89, 238, 373)
          .addImage(book, 0, 0, 351, 575)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}