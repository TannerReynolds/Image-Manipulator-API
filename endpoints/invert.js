const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"invert",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427946664960065536/render.png\">invert</a>",
    process:async (req, res, param, endpoint) => {
        imageDownload(param).then(incomingBuffer => {
            gm(incomingBuffer).negative().toBuffer('JPG', (err, buffer) => {
                res.send(buffer);
                return res.end(); 
            });
        })
    }
}