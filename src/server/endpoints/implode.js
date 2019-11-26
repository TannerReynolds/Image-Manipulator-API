const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"implode",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427946403923230721/render.jpg\">implode</a>",
    process:async (req, res, param, endpoint) => {
        imageDownload(param).then(incomingBuffer => {
            gm(incomingBuffer).implode().toBuffer('JPG', (err, buffer) => {
                res.send(buffer);
                return res.end(); 
            });
        })
    }
}