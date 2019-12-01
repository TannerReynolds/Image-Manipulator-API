const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"phone",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427953110900539392/render.jpg\">phone</a>",
    process:async (req, res, params, endpoint) => {
        let phone = await fsn.readFile(`${__dirname}/../assets/img/phone.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(420, 488)
          .setColor('#FFFFFF')
          .addRect(0, 0, 420, 488)
          .fill()
          .addImage(incomingBuffer, 0, 83, 420, 405)
          .addImage(phone, 0, 0, 420, 488)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}