const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"smartwatch",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427958357727641601/render.jpg\">smartwatch</a>",
    process:async (req, res, params, endpoint) => {
        let smartwatch = await fsn.readFile(`${__dirname}/../assets/img/smartwatch.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(845, 475)
          .setColor('#FFFFFF')
          .addRect(0, 0, 845, 475)
          .fill()
          .addImage(incomingBuffer, 350, 156, 137, 166)
          .addImage(smartwatch, 0, 0, 845, 475)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}