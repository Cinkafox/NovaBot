import { Client, MessageAttachment } from "discord.js-selfbot-v13";
import 'dotenv/config';
import logger from "./utils/logger.js";
import MessageContext from "./data/messageContext.js";
import PluginManager from "./managment/PluginManager.js";
import ConnectionManager from "./managment/ConnectionManager.js";
import PlayerListManager from "./managment/PlayerListManager.js";
import TraceManager from "./managment/TraceManager.js";

const client = new Client();

client.on('error', console.error)
client.on('ready', async () => {
    logger.info(`${client.user.username} initializing`);
    PluginManager.load("./plugins")
    ConnectionManager.initialize(client);
    logger.info(`${client.user.username} is ready!`);
})

client.on("messageDelete", async (m) =>{
    if(TraceManager.traces[m.id] === undefined)
        return;

    for (const messages of TraceManager.traces[m.id]) {
        await messages.delete();
    }

    TraceManager.removeTrace(m.id);
})

client.on("messageCreate",async (m)=>{
    if(m.author == client.user) return;

    let context = new MessageContext(m.content, m.author.username, client, m);

    if(context.Args?.shift()?.toLowerCase() !== "минка") 
        return;

    if(PlayerListManager.has("ignore", m.author.username)) {
        context.sendMessage("Ко-ко-ко! Ты в блеклисте! UwU")
        return
    }

    logger.info(context.Author, context.Text);

    m.channel.sendTyping();
    PluginManager.Execute(context.Args, errorHandler, context)
})

/**
 * 
 * @param {*} err 
 * @param {[string]]} args 
 * @param {MessageContext} context 
 */
function errorHandler(err, args, context){
    if(err.e ==0){
        logger.error("command not found")
    }

    if(err.e == 1){
        logger.error("Some error while running")
        /**
         * @type {Error}
         */
        var error = err.error;
        context.sendMessage("Ой.. пук срыньк... я немножко... обосралась.. U^U\r```js\nError while running script:\n" + error.message + "\n```")
        console.log(err.error)
    }
}

client.login(process.env.DISCORD_KEY);
logger.info("Bot is starting");