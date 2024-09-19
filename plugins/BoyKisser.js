import { MessageAttachment } from "discord.js-selfbot-v13";
import CanvasManager from "../managment/CanvasManager.js";
import PluginManager from "../managment/PluginManager.js";

function getAvatar(author){
    return "https://cdn.discordapp.com/avatars/"+author.id+"/"+author.avatar+".jpeg"
}

async function doFunnyThink(args, context, path, resp, name){
    let message = context.Message;
    let canvasArgs = CanvasManager.createCanvasArgs([]);
    let ping = message.mentions.members.first();

    if(ping != undefined){
        let avaUrl = getAvatar(ping.user);
        await canvasArgs.AddImage(avaUrl);
        canvasArgs.AddArg(ping.user.username)
    }else{
        for(let attachment of message.attachments){
            await canvasArgs.AddImage(attachment[1].attachment);
        }
        canvasArgs.AddArg(args[1])
    }

    let image = await CanvasManager.draw(canvasArgs, path);

    context.sendMessage({
        content: resp,
        files: [new MessageAttachment(image, name)]
    })
}

PluginManager.CreatePlugin("бойкиссер",async (args, context)=>{
    await doFunnyThink(args, context, "../canvas/boykisser.js", "Ня! Ня! Уряя UwU", "boykisser.png");
})

PluginManager.CreatePlugin("хуяк",async (args, context)=>{
    await doFunnyThink(args, context, "../canvas/privl.js", "O-O", "nice.png");
})

PluginManager.CreatePlugin("гладить",async (args, context)=>{
    await doFunnyThink(args, context, "../canvas/pat.js", "Ой... такой ми-и-и-илый! UwU И такой погла-а-адистый!", "pat.gif");
})

PluginManager.CreatePlugin("в рот",async (args, context)=>{
    await doFunnyThink(args, context, "../canvas/pivo.js", "А кому сейчас легко...", "pivo.png");
})
