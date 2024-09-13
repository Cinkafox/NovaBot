export default class CanvasArgs{
    /**
     * @type {[string]}
     */
    args = [];
    /**
     * @type {[object]}
     */
    images = [];

    /**
     * 
     * @param {[string]} args 
     * @param {*} imageProcessor 
     */
    constructor(args, imageProcessor){
        this.args = args;
        this.imageProcessor = imageProcessor;
    }

    AddArg(arg){
        this.args.push(arg);
    }

    async AddImage(rawImage, end = true){
        var image = await this.imageProcessor(rawImage);
        if(end){
            this.images.push(image);
        }else{
            this.images.unshift(image)
        }
    }

    async AddImages(rawImages, end = true){
        for (const image of rawImages) {
            await this.AddImage(image, end);
        }
    }
}