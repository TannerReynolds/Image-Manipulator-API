const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"frame",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427940512775798784/render.jpg\">frame</a>",
    process:async (req, res, params, endpoint) => {
        let frame = await fsn.readFile(`${__dirname}/../assets/img/frame.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(480, 698)
          .setColor('#FFFFFF')
          .addRect(0, 0, 480, 698)
          .fill()
          .addImage(incomingBuffer, 123, 373, 272, 314)
          .addImage(frame, 0, 0, 480, 698)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}