import CanvasArgs from "./data/CanvasArgs.js";
import CanvasCompound from "./data/CanvasCompound.js";
import GifCompound from "./data/GifCompound.js";
import GifSetting from "./data/GifSetting.js";

/**
 * 
 * @param {*} canvas 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {CanvasArgs} args 
 * @param {Number} frame
 */
let func = function(canvas, ctx, args, frame){
     const background = args.images[0];
     const image = args.images[1];

     const imageWidth = 112;
     const imageHeight = 112;

     canvas.width = imageWidth;
     canvas.height = imageHeight;

     const delta =  Math.sin(frame)*5;

     ctx.drawImage(image, 20 +delta, 20 - delta, imageWidth-40 - delta, imageHeight-40 + delta);
     ctx.drawImage(background, frame * imageWidth, 0, imageWidth, imageHeight, 0, 0, imageWidth, imageHeight);
}

export default new GifCompound(0,1,["./assets/images/hand.png"],func, new GifSetting(5,0,50,10));