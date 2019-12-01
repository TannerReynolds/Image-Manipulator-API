const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"sniper",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427958632718532608/render.jpg\">sniper</a>",
    process:async (req, res, params, endpoint) => {
        let sniper = await fsn.readFile(`${__dirname}/../assets/img/sniper.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(519, 583)
          .setColor('#FFFFFF')
          .addRect(0, 0, 519, 583)
          .fill()
          .addImage(incomingBuffer, 140, 316, 241, 241)
          .addImage(sniper, 0, 0, 519, 583)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}