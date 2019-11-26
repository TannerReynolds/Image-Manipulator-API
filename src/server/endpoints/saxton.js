const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"saxton",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427955933151363082/render.jpg\">saxton</a>",
    process:async (req, res, param, endpoint) => {
        let saxton = await fsn.readFile('./img/saxton.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(686, 405)
          .setColor('#FFFFFF')
          .addRect(0, 0, 686, 405)
          .fill()
          .addImage(incomingBuffer, 107, 94, 177, 119)
          .addImage(saxton, 0, 0, 686, 405)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}