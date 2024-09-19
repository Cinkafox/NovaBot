import { Canvas } from "canvas";
import CanvasArgs from "./CanvasArgs.js";
import GifSetting from "./GifSetting.js";
import GIFEncoder from "gifencoder";

export default class GifCompound{
    #func;

    /**
     * 
     * @param {Number} numArg 
     * @param {Number} numImg 
     * @param {[string]} defaultImgs 
     * @param {*} func 
     * @param {GifSetting} gifSettings 
     */
    constructor(numArg, numImg, defaultImgs, func, gifSettings){
        this.numArg = numArg;
        this.numImg = numImg;
        this.#func = func;
        this.defaultImgs = defaultImgs;
        this.gifSettings = gifSettings;
    }

/**
 * 
 * @param {Canvas} canvas 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {CanvasArgs} args 
 */
    async execute(canvas,ctx,args){
        if(this.numArg != args.args.length) 
            throw new Error("ARGS COUNT NOT MATCHING! EXCEPT:" + this.numArg + " GOT:" + args.args.length);
        if(this.numImg != args.images.length) 
            throw new Error("IMAGE COUNT NOT MATCHING! EXCEPT:" + this.numImg + " GOT:" + args.images.length);

        await args.AddImages(this.defaultImgs, false)
        
        this.#func(canvas, ctx, args, 0);

        const encoder = new GIFEncoder(canvas.width, canvas.height);

        encoder.start();
        encoder.setRepeat(this.gifSettings.repeat);
        encoder.setDelay(this.gifSettings.delay);
        encoder.setQuality(this.gifSettings.quality);
        encoder.addFrame(ctx);

        for (let frame = 1; frame < this.gifSettings.frames; frame++) {
            this.#func(canvas, ctx, args, frame);
            encoder.addFrame(ctx);
        }

        encoder.finish();
        
        return encoder.out.getData();
    }

}