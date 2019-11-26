const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"ajit",
    example: "Example for <a href=\"http://thiccbit.ch/hnb137\">ajit</a>",
    process:async (req, res, param, endpoint) => {
        let ajit = await fsn.readFile('./img/ajit.png');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(732, 568)
          .setColor('#FFFFFF')
          .addRect(0, 0, 732, 568)
          .fill()
          .addImage(incomingBuffer, 0, 0, 732, 568)
          .addImage(ajit, 0, 0, 732, 568)
          .toBuffer();
          res.send(image);
          console.log(typeof(image))
          return res.end(); 
        })
    }
}