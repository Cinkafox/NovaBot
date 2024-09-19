import { MessageAttachment } from "discord.js-selfbot-v13";
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

    context.sendMessage({
        content: "МЯУ! Мяу! Уря UwU!",
        files: [image]
    })
})

PluginManager.CreatePlugin("хуяк",async (args, context)=>{
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

    context.sendMessage({
        content: "O-O",
        files: [image]
    })
})

PluginManager.CreatePlugin("гладить",async (args, context)=>{
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

    let image = await CanvasManager.draw(canvasArgs, "../canvas/pat.js");

    context.sendMessage({
        content: "O-O",
        files: [new MessageAttachment(image,"meow.gif")]
    })
})

PluginManager.CreatePlugin("в рот",async (args, context)=>{
    let message = context.Message;
    let canvasArgs = CanvasManager.createCanvasArgs([]);
    let ping = message.mentions.members.first();

    if(ping != undefined){
        if(ping.user.username == "cinkafox"){
            context.sendMessage("хрюкни!")
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

    context.sendMessage({
        content: "А кому сейчас легко...",
        files: [image]
    })
})

function getAvatar(author){
    return "https://cdn.discordapp.com/avatars/"+author.id+"/"+author.avatar+".jpeg"
}