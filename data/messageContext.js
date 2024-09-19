import { Client, Message, MessagePayload } from "discord.js-selfbot-v13";
import TraceManager from "../managment/TraceManager.js";

export default class MessageContext{
    /**
     * @type {[string]}
     */
    Args;
    Text;
    /**
     * @type {Message}
     */
    Message;
    Author;
    /**
     * @type {Client}
     */
    Client;

    constructor(text, author, client, message){
        this.Args = this._parse(text);
        this.Text = text;
        this.Author = author;
        this.Message = message;
        this.Client = client;
    }


    /**
     * 
     * @param {string | MessagePayload | import("discord.js-selfbot-v13").MessageOptions} message 
     */
    async sendMessage(message){
        let sended = await this.Message.channel.send(message);
        TraceManager.addTrace(this.Message.id, sended);
    }

    /**
     * 
     * @param {String} message 
     */
    _parse(message){
        if(message == undefined || message == "") 
            return [];

        const parsedArgs = message
        .match(/(?:[^\s"]+|"[^"]*")+/g)
        .map(arg => arg.replace(/(^")|("$)/g, '')); // Убираем кавычки

        return parsedArgs;
    }
}