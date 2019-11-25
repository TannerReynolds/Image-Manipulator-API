const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"illegalalien",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427945859523674132/render.jpg\">illegalalien</a>",
    process:async (req, res, param, endpoint) => {
        let illegalalien = await fsn.readFile('./img/trumpTweet.jpg');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(650, 551)
          .setColor('#FFFFFF')
          .addImage(illegalalien, 0, 0, 650, 551)
          .addImage(incomingBuffer, 76, 86, 425, 426)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}