import PluginManager from "../managment/PluginManager.js";
import ContentManager from "../managment/ContentManager.js";
import streamMessageAudio from "../data/stream/streamMessageAudio.js";

PluginManager.CreatePlugin("помяукай",async (args,context)=>{
    await doMeowThink(context, "./assets/music/meow.wav");
})

PluginManager.CreatePlugin("пофырчи",async (args,context)=>{
    await doMeowThink(context, "./assets/music/fir.wav");
})

async function doMeowThink(context, path){
    const channel = context.Message.member.voice.channel;
    if(channel === null){
        await streamMessageAudio(path, context)
        return;
    }
    await ContentManager.play(channel, path, false);
}