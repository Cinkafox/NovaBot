import ffmpeg from 'fluent-ffmpeg';
import prism from "prism-media";
import { StreamOutput } from '@dank074/fluent-ffmpeg-multistream-ts';
import PCancelable from 'p-cancelable';
import { AudioStream, H264NalSplitter, H265NalSplitter, IvfTransformer, MediaUdp, VideoStream } from '@dank074/discord-video-stream';
import { normalizeVideoCodec } from '@dank074/discord-video-stream/dist/utils.js';

/**
 * 
 * @param {string} input 
 * @param {MediaUdp} mediaUdp 
 * @param {boolean} includeAudio 
 * @param {object} customHeaders 
 * @param {[string]} options 
 * @returns {PCancelable<string>}
 */
export default function streamLivestreamContent(input, mediaUdp, includeAudio = true, includeVideo = true, customHeaders = undefined, options = []) {
    return new PCancelable((resolve, reject, onCancel) => {
        if(!includeAudio && !includeVideo) 
            throw new Error("audio and video is not included!");

        let headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.3",
            "Connection": "keep-alive"
        }

        headers = { ...headers, ...(customHeaders ?? {}) };

        let isHttpUrl = false;
        let isHls = false;

        if (typeof input === "string") {
            isHttpUrl = input.startsWith('http') || input.startsWith('https');
            isHls = input.includes('m3u');
        }

        const streamOpts = mediaUdp.mediaConnection.streamOptions;

        try {
            const command = ffmpeg(input)
                .addOption('-loglevel', '0')
                .addOption('-fflags', 'nobuffer')
                .addOption('-analyzeduration', '0')
                .on('end', () => {
                    resolve("video ended")
                })
                .on("error", (err, stdout, stderr) => {
                    reject('cannot play video ' + err.message)
                })
                .on('stderr', console.error);

            if(includeVideo){
                const videoStream = new VideoStream(mediaUdp, streamOpts.fps, streamOpts.readAtNativeFps);
                const videoCodec = normalizeVideoCodec(streamOpts.videoCodec);
                let videoOutput;

                switch(videoCodec) {
                    case 'H264':
                        videoOutput = new H264NalSplitter();
                        break;
                    case 'H265':
                        videoOutput = new H265NalSplitter();
                        break;
                    case "VP8":
                        videoOutput = new IvfTransformer();
                        break;
                    default:
                        throw new Error("Codec not supported");
                }

                if (videoCodec === 'VP8') {
                    command.output(StreamOutput(videoOutput).url, { end: false })
                        .noAudio()
                        .size(`${streamOpts.width}x${streamOpts.height}`)
                        .fpsOutput(streamOpts.fps)
                        .videoBitrate(`${streamOpts.bitrateKbps}k`)
                        .format('ivf')
                        .outputOption('-deadline', 'realtime');
                } else if (videoCodec === "H265") {
                    command.output(StreamOutput(videoOutput).url, { end: false })
                        .noAudio()
                        .size(`${streamOpts.width}x${streamOpts.height}`)
                        .fpsOutput(streamOpts.fps)
                        .videoBitrate(`${streamOpts.bitrateKbps}k`)
                        .format('hevc')
                        .outputOptions([
                            '-tune zerolatency',
                            '-pix_fmt yuv420p',
                            `-preset ${streamOpts.h26xPreset}`,
                            '-profile:v main',
                            `-g ${streamOpts.fps}`,
                            `-bf 0`,
                            `-x265-params keyint=${streamOpts.fps}:min-keyint=${streamOpts.fps}`,
                            '-bsf:v hevc_metadata=aud=insert'
                        ]);
                } else {
                    command.output(StreamOutput(videoOutput).url, { end: false })
                        .noAudio()
                        .size(`${streamOpts.width}x${streamOpts.height}`)
                        .fpsOutput(streamOpts.fps)
                        .videoBitrate(`${streamOpts.bitrateKbps}k`)
                        .format('h264')
                        .outputOptions([
                            '-tune zerolatency',
                            '-pix_fmt yuv420p',
                            `-preset ${streamOpts.h26xPreset}`,
                            '-profile:v baseline',
                            `-g ${streamOpts.fps}`,
                            `-bf 0`,
                            `-x264-params keyint=${streamOpts.fps}:min-keyint=${streamOpts.fps}`,
                            '-bsf:v h264_metadata=aud=insert'
                        ]);
                }
    
                videoOutput.pipe(videoStream, { end: false });
            }

            
            if (includeAudio) {
                const audioStream = new AudioStream(mediaUdp);

                // make opus stream
                const opus = new prism.opus.Encoder({ channels: 2, rate: 48000, frameSize: 960 });

                command
                    .output(StreamOutput(opus).url, { end: false })
                    .noVideo()
                    .audioChannels(2)
                    .audioFrequency(48000)
                    //.audioBitrate('128k')
                    .format('s16le');

                opus.pipe(audioStream, { end: false });
            }

            if(streamOpts.hardwareAcceleratedDecoding) command.inputOption('-hwaccel', 'auto');

            if(streamOpts.readAtNativeFps) command.inputOption('-re')

            if (isHttpUrl) {
                command.inputOption('-headers',
                    Object.keys(headers).map(key => key + ": " + headers[key]).join("\r\n")
                );
                if (!isHls) {
                    command.inputOptions([
                        '-reconnect 1',
                        '-reconnect_at_eof 1',
                        '-reconnect_streamed 1',
                        '-reconnect_delay_max 4294'
                    ]);
                }
            }

            command.addOptions(options)

            command.run();
            onCancel(() => command.kill("SIGINT"));
        } catch (e) {
            //audioStream.end();
            //videoStream.end();
            reject("cannot play video " + e.message);
        }
    })
}