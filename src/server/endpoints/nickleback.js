const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"nickleback",
    example: "Example for <a href=\"http://thiccbit.ch/hnb137\">nickleback</a>",
    process:async (req, res, param, endpoint) => {
        let nickleback = await fsn.readFile('./img/nickleback.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(960, 540)
          .setColor('#FFFFFF')
          .addRect(0, 0, 960, 540)
          .fill()
          .translate(367, 212)
          .rotate(-12 * Math.PI / 180)
          .addImage(incomingBuffer, 0, 0, 328, 257)
          .rotate(12 * Math.PI / 180)
          .translate(-367, -212)
          .addImage(nickleback, 0, 0, 960, 540)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}