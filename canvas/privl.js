import CanvasArgs from "./data/CanvasArgs.js";
import CanvasCompound from "./data/CanvasCompound.js";

/**
 * 
 * @param {*} canvas 
 * @param {*} ctx 
 * @param {CanvasArgs} args 
 */
let func = function(canvas, ctx, args){
     const background = args.images[0];
     const image = args.images[1];

     const imageWidth = background.width;
     const imageHeight = background.height;

     canvas.width = background.width;
     canvas.height = background.height;

     ctx.drawImage(background, 0, 0, imageWidth, imageHeight);
     ctx.drawImage(image, 288,0, 233, 233)
}

export default new CanvasCompound(0,1,["./assets/images/meow.png"],func);