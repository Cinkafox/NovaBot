import CanvasArgs from "../canvas/data/CanvasArgs.js";
import { createCanvas, loadImage } from 'canvas';

class CanvasManager{
    constructor(){
        this.canvas = createCanvas(128, 128)
        this.ctx = this.canvas.getContext('2d')
    }
    /**
     * 
     * @param {CanvasArgs} args 
     * @param {string} path 
     */
    async draw(args, path){
        var canvasDrawer = await import(path);
        let outData = await canvasDrawer.default.execute(this.canvas, this.ctx, args);

        if(outData === undefined)
            return this.canvas.toBuffer('image/png');
        return outData;
    }

    createCanvasArgs(args){
        return new CanvasArgs(args, loadImage)
    }
}

export default new CanvasManager();