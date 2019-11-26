const ascii = require("image-to-ascii")
const sizeOf = require("buffer-image-size");
const imageDownload = require("image-download");
module.exports = {
    endpoint:"printer",
    example: "Example for <a href=\"https://cdn.discordapp.com/attachments/413822583914496022/427953452585451520/render.jpg\">plane</a>",
    process:async (req, res, param) => {
        imageDownload(param).then(incomingBuffer => {
            let dimensions = sizeOf(incomingBuffer)
            let dimX = dimensions.width
            let dimY = dimensions.height
            let multiplier
            if (dimX > dimY) {
                multiplier = 28 / dimX
                dimX = multiplier * dimX
                dimY = multiplier * dimY
                printer(res, param, dimX, dimY)
            } else {
                multiplier = 28 / dimY
                dimX = multiplier * dimX
                dimY = multiplier * dimY
                printer(res, param, dimX, dimY)
            }
        })
    }
}
async function printer(res, img, x, y) {
    ascii(img, { colored: false, size: { width: x, height: y } }, (err, result) => {
        res.setHeader("Content-Type", "text/text")
        res.send(result)
        return res.end();
    });
}