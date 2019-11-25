const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"bernie",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427927219323535381/render.jpg\">bernie</a>",
    process:async (req, res, param, endpoint) => {
        let bernie = await fsn.readFile('./img/bernie.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(500, 327)
          .setColor('#FFFFFF')
          .addRect(0, 0, 500, 327)
          .fill()
          .addImage(incomingBuffer, 192, 41, 235, 205)
          .addImage(bernie, 0, 0, 500, 327)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}