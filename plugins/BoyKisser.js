import CanvasManager from "../managment/CanvasManager.js";
import PluginManager from "../managment/PluginManager.js";

PluginManager.CreatePlugin("бойкиссер",async (args, context)=>{
    let message = context.Message;
    let canvasArgs = CanvasManager.createCanvasArgs([]);
    let ping = message.mentions.members.first();

    if(ping != undefined){
        let avaUrl = getAvatar(ping.user);
        await canvasArgs.AddImage(avaUrl);
    }else{
        for(let attachment of message.attachments){
            await canvasArgs.AddImage(attachment[1].attachment);
        }
    }

    let image = await CanvasManager.draw(canvasArgs, "../canvas/boykisser.js");

    message.channel.send({
        content: "МЯУ! Мяу! Уря UwU!",
        files: [image]
    })
})

function getAvatar(author){
    return "https://cdn.discordapp.com/avatars/"+author.id+"/"+author.avatar+".jpeg"
}