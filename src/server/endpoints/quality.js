const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
const gm = require('gm');
module.exports = {
    endpoint:"quality",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427954523206582273/render.jpg\">quality</a>",
    process:async (req, res, params, endpoint) => {
        imageDownload(params.url).then(incomingBuffer => {
            gm(incomingBuffer).quality(6).toBuffer('JPG', (err, buffer) => {
                res.send(buffer);
                return res.end(); 
            });
        })
    }
}