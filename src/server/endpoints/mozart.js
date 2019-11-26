const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"mozart",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427950236829351956/render.jpg\">mozart</a>",
    process:async (req, res, param, endpoint) => {
        let mozart = await fsn.readFile('./img/mozart.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(534, 585)
          .setColor('#FFFFFF')
          .addRect(0, 0, 534, 585)
          .fill()
          .addImage(incomingBuffer, 68, 160, 171, 292)
          .addImage(mozart, 0, 0, 534, 585)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}