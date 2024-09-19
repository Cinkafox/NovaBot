import CanvasArgs from "./CanvasArgs.js";

export default class CanvasCompound{
    #func;

    /**
     * 
     * @param {Number} numArg 
     * @param {Number} numImg 
     * @param {[string]} defaultImgs 
     * @param {*} func 
     */
    constructor(numArg, numImg, defaultImgs, func){
        this.numArg = numArg;
        this.numImg = numImg;
        this.#func = func;
        this.defaultImgs = defaultImgs;
    }

    /**
     * execute for canvas drawing
     * @param {CanvasArgs} args 
     */
    async execute(canvas,ctx,args){
        if(this.numArg > args.args.length) 
            throw new Error("ARGS COUNT NOT MATCHING! EXCEPT:" + this.numArg + " GOT:" + args.args.length);
        if(this.numImg > args.images.length) 
            throw new Error("IMAGE COUNT NOT MATCHING! EXCEPT:" + this.numImg + " GOT:" + args.images.length);

        await args.AddImages(this.defaultImgs, false)

        this.#func(canvas, ctx, args);
    }
}