import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import { Message, MessageFlags } from "discord.js-selfbot-v13";
import ContentManager from "../../managment/ContentManager.js";
import { StreamOutput } from '@dank074/fluent-ffmpeg-multistream-ts';
import { PassThrough } from 'stream';

/**
 * 
 * @param {Buffer} buffer 
 * @param {*} m 
 */
function playBuff(buffer,m){
    m.channel.send({
        files: [
            {
                attachment: buffer,
                name: "voice-message.wav",
                contentType : "audio/wav",
                duration: buffer.length / 48000 / 2,
                waveform: 'AAANCAsHDRIJBwoLB2a0tbWgnk95Rz0='
            }
        ]
        ,
        flags : MessageFlags.FLAGS.IS_VOICE_MESSAGE
    })
}

/**
 * 
 * @param {string} input 
 * @param {Message} m 
 * @param {[string]} options
 * @returns {Promise<string>}
 */
export default function (input, m, options = []){
    return new Promise((resolve, reject) => {
        m.channel.sendTyping();
        const headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.3",
            "Connection": "keep-alive"
        }

        let command;

        let isHttpUrl = false;
        let isHls = false;

        if(typeof input === "string")
        {
            isHttpUrl = input.startsWith('http') || input.startsWith('https');
            isHls = input.includes('m3u');
        }  
        
        if(!isHttpUrl && ContentManager.getExtension(input) === "wav"){
            let buffer = fs.readFileSync(input);
            playBuff(buffer, m);
            return "audio ended";
        }

        try {
            const tunnel = new PassThrough()

            command = ffmpeg(input)
            .addOption('-loglevel', '0')
            .addOption('-fflags', 'nobuffer')
            .addOption('-analyzeduration', '0')
            .on('end', () => {
                command = undefined;
            })
            .on("error", (err, stdout, stderr) => {
                command = undefined;
                reject('cannot play audio ' + err.message + " " + stdout + " " + stderr)
            })
            .on('stderr', console.error)
            .audioCodec('pcm_s16le')
            .format('wav')
            .output(StreamOutput(tunnel).url)
            .noVideo()
            .audioChannels(2)
            .audioFrequency(48000);

            if(isHttpUrl) {
                command.inputOption('-headers', 
                    Object.keys(headers).map(key => key + ": " + headers[key]).join("\r\n")
                );
                if(!isHls) {
                    command.inputOptions([
                        '-reconnect 1',
                        '-reconnect_delay_max 4294'
                    ]);
                }
            }

            command.addOptions(options)
            command.run();

            const chunks = [];
            tunnel.on('data', (d)=>{
                chunks.push(d);
            })

            tunnel.on('end',()=>{
                playBuff(Buffer.concat(chunks), m);
            })
        } catch(e) {
            command = undefined;
            reject("cannot play video " + e.message);
        }
    })
}