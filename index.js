import { Client, MessageAttachment } from "discord.js-selfbot-v13";
import 'dotenv/config';
import logger from "./utils/logger.js";
import MessageContext from "./data/messageContext.js";
import PluginManager from "./managment/PluginManager.js";
import ConnectionManager from "./managment/ConnectionManager.js";

const client = new Client();

client.on('ready', async () => {
    PluginManager.load("./plugins")
    ConnectionManager.initialize(client);
    logger.info(`${client.user.username} is ready!`);
})

client.on("messageCreate",async (m)=>{
    if(m.author == client.user) return;

    if(m.author == "milipizdrik") {
        m.channel.send("Ко-ко-ко! Ты в блеклисте! UwU")
        return
    }

    let context = new MessageContext(m.content, m.author.globalName, client, m);

    if(context.Args.shift() !== "минка") 
        return;

    logger.info(context.Author, context.Text);

    m.channel.sendTyping();
    PluginManager.Execute(context.Args, errorHandler, context)
})

function errorHandler(err){
    if(err.e ==0){
        logger.error("command not found")
    }

    if(err.e == 1){
        logger.error("Some error while running")
        console.log(err.error)
    }
}

client.login(process.env.DISCORD_KEY);
logger.info("Bot is starting");