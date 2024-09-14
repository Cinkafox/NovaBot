import CanvasArgs from "./data/CanvasArgs.js";
import CanvasCompound from "./data/CanvasCompound.js";

/**
 * 
 * @param {*} canvas 
 * @param {*} ctx 
 * @param {CanvasArgs} args 
 */
let func = function(canvas, ctx, args){

    let cover = args.images[0]
    canvas.width = cover.width * 2;
    canvas.height = cover.height * 2

    ctx.drawImage(cover, 0, 0, cover.width * 2, cover.height * 2)

    const avatar = args.images[1]
    ctx.drawImage(avatar, 26, 26, 160, 160)

    ctx.fillStyle = "#fff";
    ctx.fillRect(200, 100, 300, 30);

    ctx.font = 'normal 15px Arial'
    ctx.fillStyle = '#5a0'
    ctx.textAlign = 'left'
    ctx.fillText(args.args[0] + " 42 года(300 метров от вас)", 202, 122)
}

export default new CanvasCompound(1,1,["./assets/images/thn.jpg"],func);