import CanvasArgs from "./data/CanvasArgs.js";
import CanvasCompound from "./data/CanvasCompound.js";

/**
 * 
 * @param {*} canvas 
 * @param {*} ctx 
 * @param {CanvasArgs} args 
 */
let func = function(canvas,ctx, args){
     const background = args.images[0];
     const image = args.images[1];

     const imageWidth = background.width;
     const imageHeight = background.height;

     canvas.width = background.width;
     canvas.height = background.height;

     let maxy = imageWidth > imageHeight ? imageWidth : imageHeight;
     let miny = imageWidth < imageHeight ? imageWidth : imageHeight;

     var delta = maxy-miny;

     ctx.drawImage(image, -delta / 2, 0, maxy, maxy);
     ctx.drawImage(background, 0, 0, imageWidth, imageHeight);
}

export default new CanvasCompound(0,1,["./assets/images/boykisser.png"],func);