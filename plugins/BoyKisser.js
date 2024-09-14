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

PluginManager.CreatePlugin("привлекает",async (args, context)=>{
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

    let image = await CanvasManager.draw(canvasArgs, "../canvas/privl.js");

    message.channel.send({
        content: "O-O",
        files: [image]
    })
})

PluginManager.CreatePlugin("в рот",async (args, context)=>{
    let message = context.Message;
    let canvasArgs = CanvasManager.createCanvasArgs([]);
    let ping = message.mentions.members.first();

    if(ping != undefined){
        if(ping.user.username == "cinkafox"){
            message.channel.send("хрюкни!")
            return;
        }
        let avaUrl = getAvatar(ping.user);
        await canvasArgs.AddImage(avaUrl);
        canvasArgs.AddArg(ping.user.username)
    }else{
        canvasArgs.AddArg(args[1])
        for(let attachment of message.attachments){
            await canvasArgs.AddImage(attachment[1].attachment);
        }
    }

    let image = await CanvasManager.draw(canvasArgs, "../canvas/pivo.js");

    message.channel.send({
        content: "А кому сейчас легко...",
        files: [image]
    })
})

function getAvatar(author){
    return "https://cdn.discordapp.com/avatars/"+author.id+"/"+author.avatar+".jpeg"
}