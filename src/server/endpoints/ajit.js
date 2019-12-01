const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"ajit",
    example: "Example for <a href=\"http://thiccbit.ch/hnb137\">ajit</a>",
    process:async (req, res, params, endpoint) => {
        let ajit = await fsn.readFile(`${__dirname}/../assets/img/ajit.png`);
        imageDownload(params.url).then(incomingBuffer => {
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