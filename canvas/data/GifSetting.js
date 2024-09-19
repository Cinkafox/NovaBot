export default class GifSetting{
    frames = 1;
    repeat = -1;
    delay = 300;
    quality = 10;

    /**
     * 
     * @param {Number} frames 
     * @param {Number} repeat 
     * @param {Number} delay 
     * @param {Number} quality 
     */
    constructor(frames, repeat, delay, quality){
        this.frames = frames;
        this.repeat = repeat;
        this.delay = delay;
        this.quality = quality;
    }
}