const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"zuck",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427967783058407434/render.jpg\">zuck</a>",
    process:async (req, res, params, endpoint) => {
        let zuck = await fsn.readFile(`${__dirname}/../assets/img/zuck.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(500, 596)
          .setColor('#FFFFFF')
          .addRect(0, 0, 500, 596)
          .fill()
          .addImage(zuck, 0, 0, 500, 596)
          .addImage(incomingBuffer, 12, 57, 482, 376)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}