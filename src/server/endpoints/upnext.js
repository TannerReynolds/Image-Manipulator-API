const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"upnext",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427966619940159489/render.jpg\">upnext</a>",
    process:async (req, res, params, endpoint) => {
        let upnext = await fsn.readFile(`${__dirname}/../assets/img/upnext.png`);
        imageDownload(params.url).then(incomingBuffer => {
          let image = new Canvas(600, 337)
          .setColor('#FFFFFF')
          .addRect(0, 0, 600, 337)
          .fill()
          .addImage(incomingBuffer, 0, 0, 600, 337)
          .addImage(upnext, 0, 0, 600, 337)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}