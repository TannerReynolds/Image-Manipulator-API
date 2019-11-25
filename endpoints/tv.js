const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"tv",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427966141902880789/render.jpg\">tv</a>",
    process:async (req, res, param, endpoint) => {
        let tv = await fsn.readFile('./img/tv.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(894, 504)
          .setColor('#FFFFFF')
          .addRect(0, 0, 894, 504)
          .fill()
          .addImage(incomingBuffer, 355, 30, 388, 309) 
          .addImage(tv, 0, 0, 894, 504)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}