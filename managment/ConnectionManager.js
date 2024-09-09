import { command, streamLivestreamVideo, MediaUdp, getInputMetadata, inputHasAudio, Streamer } from "@dank074/discord-video-stream";
import logger from "../utils/logger.js";

class ConnectionManager{
    #streamer
    #udp

    initialize(client){
        this.#streamer = new Streamer(client);
    }
    /**
     * @type {MediaUdp}
     */
    get udp(){
        return this.#udp;
    }

    /**
 *  @type {Streamer}
    */
    get streamer(){
        return this.#streamer;
    }

    get isConnected(){
        return this.#udp !== undefined;
    }

    async connect(channel){
        if(this.isConnected) 
            this.disconnect();

        this.#udp = await this.#streamer.joinVoice(channel.guild.id, channel.id);

        if(this.isConnected){
            logger.info("Connected to" ,channel.id);
            return true;
        }

        logger.error("Some error to connecting:" ,channel.id);
        return false;
    }

    disconnect()
    {
        if(!this.isConnected)
            return
        
        logger.info("Disconnected from " + this.#streamer.voiceConnection.channelId)
        this.#udp = undefined
        this.#streamer.stopStream()
        this.#streamer.leaveVoice()
    }
}

export default new ConnectionManager();