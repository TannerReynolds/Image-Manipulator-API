const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"door",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427931864020549642/render.jpg\">door</a>",
    process:async (req, res, param, endpoint) => {
        let door = await fsn.readFile('./img/door.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(1000, 479)
          .setColor('#FFFFFF')
          .addRect(0, 0, 1000, 479)
          .fill()
          .addImage(incomingBuffer, 332, 9, 327, 458)
          .addImage(door, 0, 0, 1000, 479)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}