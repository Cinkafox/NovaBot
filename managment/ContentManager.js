import streamLivestreamContent from "../data/stream/streamLivestreamContent.js"
import logger from "../utils/logger.js"
import ConnectionManager from "./ConnectionManager.js"

class ContentManager{
    async play(channel, url, video = true){
        try {
            logger.info("показываю",url,"в", channel)
            if(!channel || !await ConnectionManager.connect(channel)) 
                return
      
            const upd = ConnectionManager.udp
            if(video){
              ConnectionManager.streamer.signalVideo(channel.guild.id,channel.id,true)
              upd.mediaConnection.setVideoStatus(true)
            }else{
              upd.mediaConnection.setSpeaking(true)
            }
      
            await streamLivestreamContent(url, upd, true, video, undefined, [])
            logger.info("закончил кинопоказ")
       } catch (error) {
            console.log(error)
       } finally{
            ConnectionManager.disconnect()
       }
    }
      
    getExtension(filename) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
      }
      
    isVideo(filename) {
        var ext = this.getExtension(filename);
        switch (ext.toLowerCase()) {
          case 'm4v':
          case 'avi':
          case 'mpg':
          case 'mp4':
            // etc
            return true;
        }
        return false;
      }
}

export default new ContentManager();