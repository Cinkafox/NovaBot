import CanvasManager from "../managment/CanvasManager.js";
import PluginManager from "../managment/PluginManager.js";

PluginManager.CreatePlugin("демотиватор",async (args, context)=>{
    args.shift();
    let message = context.Message;
    let canvasArgs = CanvasManager.createCanvasArgs(args);

    for(let attachment of message.attachments){
        await canvasArgs.AddImage(attachment[1].attachment);
    }

    let image = await CanvasManager.draw(canvasArgs, "../canvas/demotivator.js");

    context.sendMessage({
        content: "Нате," + message.author.toString(),
        files: [image]
    })
})