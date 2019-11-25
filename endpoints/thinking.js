const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"thinking",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427965610878566402/render.jpg\">thinking</a>",
    process:async (req, res, param, endpoint) => {
        let thinking = await fsn.readFile('./img/thinking.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(900, 635)
          .setColor('#FFFFFF')
          .addRect(0, 0, 900, 635)
          .fill()
          .addImage(incomingBuffer, 86, 0, 340, 264)
          .addImage(thinking, 0, 0, 900, 635)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}