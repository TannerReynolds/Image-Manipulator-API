const gm = require('gm');
const imageDownload = require('image-download');
module.exports = {
    endpoint:"charcoal",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427928418898935819/render.png\">charcoal</a>",
    process:async (req, res, param, endpoint) => {
        imageDownload(param).then(incomingBuffer => {
            gm(incomingBuffer).charcoal().toBuffer('PNG', (err, buffer) => {
                res.send(buffer);
                return res.end(); 
            })
        })
    }
}