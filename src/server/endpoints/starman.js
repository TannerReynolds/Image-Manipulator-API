const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"starman",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427964735032524810/render.jpg\">starman</a>",
    process:async (req, res, params, endpoint) => {
        let starman = await fsn.readFile(`${__dirname}/../assets/img/starman.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(800, 442)
          .setColor('#FFFFFF')
          .addRect(0, 0, 800, 442)
          .fill()
          .addImage(incomingBuffer, 0, 0, 800, 442)
          .addImage(starman, 0, 0, 800, 442)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}