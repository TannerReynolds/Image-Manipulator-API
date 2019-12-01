const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"disabled",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427931223482957837/render.jpg\">disabled</a>",
    process:async (req, res, params, endpoint) => {
        let disabled = await fsn.readFile(`${__dirname}/../assets/img/disabled.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(564, 564)
          .setColor('#FFFFFF')
          .addRect(0, 0, 564, 564)
          .fill()
          .addImage(disabled, 0, 0, 564, 564)
          .addImage(incomingBuffer, 386, 249, 173, 173)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}