const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"science",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427956364510494720/render.jpg\">science</a>",
    process:async (req, res, param, endpoint) => {
        let science = await fsn.readFile('./img/science.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(900, 750)
          .setColor('#FFFFFF')
          .addRect(0, 0, 900, 750)
          .fill()
          .addImage(incomingBuffer, 3, 131, 891, 619)
          .addImage(science, 0, 0, 900, 750)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}