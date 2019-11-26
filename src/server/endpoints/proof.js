const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"proof",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427954227998883841/render.jpg\">proof</a>",
    process:async (req, res, param, endpoint) => {
        let proof = await fsn.readFile('./img/proof.jpg');
        imageDownload(param).then(incomingBuffer => {
          let image = new Canvas(855, 481)
          .setColor('#FFFFFF')
          .addRect(0, 0, 855, 481)
          .fill()
          .addImage(proof, 0, 0, 855, 481)
          .addImage(incomingBuffer, 515, 70, 302, 267)
          .toBuffer();
          res.send(image);
          return res.end(); 
        })
    }
}