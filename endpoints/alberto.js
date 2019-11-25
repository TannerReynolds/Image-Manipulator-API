const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"alberto",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427926490471202817/render.jpg\">alberto</a>",
    process:async (req, res, param, endpoint) => {
        let alberto = await fsn.readFile('./img/alberto.png');
        imageDownload(param).then(incomingBuffer => {
            let image = new Canvas(400, 301)
            .setColor('#FFFFFF')
            .addRect(0, 0, 400, 301)
            .fill()
          .addImage(incomingBuffer, 0, 0, 400, 301)
          .addImage(alberto, 0, 0, 400, 301)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}