import ConnectionManager from "../managment/ConnectionManager.js"
import PluginManager from "../managment/PluginManager.js"
import logger from "../utils/logger.js";
import streamMessageAudio from "../data/stream/streamMessageAudio.js";
import ContentManager from "../managment/ContentManager.js";

PluginManager.CreatePlugin("стрим",async (args,context)=>{
    if(context.Args[1] === undefined){
      logger.error("URL is not provided");
      return
    }

    const path = context.Args[1];
    let video = ContentManager.isVideo(path);
    if(context.Args[2] !== undefined){
      video = context.Args[2] == "1";
    }

    const channel = context.Message.member.voice.channel;
    await ContentManager.play(channel, path, video);
})

PluginManager.CreatePlugin("цыц",async (args,context)=>{
    ConnectionManager.disconnect();
})

PluginManager.CreatePlugin("гс", async(args, context)=>{
  try {
    await streamMessageAudio(context.Args[1], context)
  } catch (error) {
    console.log(error)
  }
})

