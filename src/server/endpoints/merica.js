const GIFEncoder = require('gifencoder');
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const imageDownload = require('image-download');
const gm = require("gm")
let f1 
let f2 
let f3 
let f4 
let f5 
let f6 
let f7 
let f8 
let f9 
let f10
let f11
let f12
let f13
let f14
let f15
let f16
let f17
let f18
let f19
let f20
loadFrames();
module.exports = {
    endpoint: "merica",
    example: "asdasdasdasda",
    process: async (req, res, param, endpoint) => { // 498, 278
        const frames = [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20]
        imageDownload(param).then(incomingBuffer => {
            gm(incomingBuffer, "img.png")
            .resize(498, 278)
            .toBuffer('PNG', (err, buffer) => {
                if (err) return handle(err);
                const encoder = new GIFEncoder(498, 278);
                encoder.start();
                encoder.setRepeat(0); 
                encoder.setDelay(90); 
                encoder.setQuality(5); 
                for(i = 0; i < frames.length; i++) {
                    let image = new Canvas(498, 278)
                    .addImage(buffer, 0, 0, 498, 278)
                    .setGlobalAlpha(0.2)
                    .addImage(frames[i], 0, 0, 498, 278)
                    encoder.addFrame(image);
                    if (i === frames.length - 1) {
                        encoder.finish();
                        const buf = encoder.out.getData();
                        res.send(buf)
                        return res.end()
                    };
                }
            })
        })
    }
}
async function loadFrames() {
    f1 = await fsn.readFile('./img/merica/m1.png')
    f2 = await fsn.readFile('./img/merica/m2.png')
    f3 = await fsn.readFile('./img/merica/m3.png')
    f4 = await fsn.readFile('./img/merica/m4.png')
    f5 = await fsn.readFile('./img/merica/m5.png')
    f6 = await fsn.readFile('./img/merica/m6.png')
    f7 = await fsn.readFile('./img/merica/m7.png')
    f8 = await fsn.readFile('./img/merica/m8.png')
    f9 = await fsn.readFile('./img/merica/m9.png')
    f10 = await fsn.readFile('./img/merica/m10.png')
    f11 = await fsn.readFile('./img/merica/m11.png')
    f12 = await fsn.readFile('./img/merica/m12.png')
    f13 = await fsn.readFile('./img/merica/m13.png')
    f14 = await fsn.readFile('./img/merica/m14.png')
    f15 = await fsn.readFile('./img/merica/m15.png')
    f16 = await fsn.readFile('./img/merica/m16.png')
    f17 = await fsn.readFile('./img/merica/m17.png')
    f18 = await fsn.readFile('./img/merica/m18.png')
    f19 = await fsn.readFile('./img/merica/m19.png')
    f20 = await fsn.readFile('./img/merica/m20.png')
}