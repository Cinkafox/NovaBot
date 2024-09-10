import PluginManager from "../managment/PluginManager.js"
import ContentManager from "../managment/ContentManager.js";
import streamMessageAudio from "../data/stream/streamMessageAudio.js";

PluginManager.CreatePlugin("помяукай",async (args,context)=>{
    await doMeowThink(context.Message, "./assets/music/meow.wav");
})

PluginManager.CreatePlugin("пофырчи",async (args,context)=>{
    await doMeowThink(context.Message, "./assets/music/fir.wav");
})

async function doMeowThink(message, path){
    const channel = message.member.voice.channel;
    if(channel === null){
        await streamMessageAudio(path, message)
        return;
    }
    await ContentManager.play(channel, path, false);
}