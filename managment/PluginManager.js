import MessageContext from "../data/messageContext.js";
import fs from "fs";
import path from "path";
import logger from "../utils/logger.js";
import { isPromise } from "util/types";

function requireUncached(module) {
    import(module);
}

class PluginManager {
    plugins = {}

    /**
     * 
     * @callback func
     * @param {string[]} args
     * @param {MessageContext} context
     */

    /**
     * Create a command
     * @param {string} path
     * @param {func} func 
     */
    CreatePlugin(path, func) {
        logger.info("Added",path);
        this._CreatePlugin(this.plugins,path.split(" "),func)
    }

    _CreatePlugin(plugins,path,func){
        if (!plugins[path[0]]) plugins[path[0]]={}
        if(path[1])return this._CreatePlugin(plugins[path.shift()],path,func)
        plugins[path[0]] = {
            default: func
        }
    }

    Execute(args, errorHandler){
        let runArgs = [...arguments];
        runArgs.shift()
        runArgs.shift()
        return this._Execute(args, errorHandler, this.plugins, [args, ...runArgs])
    }

    _Execute(args, errorHandler, commands, execArgs) {
        if(args[0] === undefined){
            errorHandler({e:0,error: Error("Команды нема")})
            return;
        }

        const command = commands[args[0].toLowerCase()]

        if (!command) {
            errorHandler({e:0,error: Error("Команды нема")})
            return;
        }
        if (args[1] && command[args[1]]) {
            args.shift()
            return this._Execute(args, errorHandler, command, execArgs)
        }
        var func = command
        if(command.default !== undefined) func = command.default

        try {
            /**
             * @type {Promise}
             */
            let outp = func(...execArgs);
            if(isPromise(outp)){
                outp.catch(error =>{
                    errorHandler({e:1,error});
                })
            }
        } catch (error) {
            errorHandler({e:1,error});
        }
    }

    load(dir) {
        const normalizedPath = dir;
        for (let file of fs.readdirSync(normalizedPath)) {
            try {
                logger.info("Start Init " + file)
                let type = file.split(".")
                type = type[type.length - 1]
                if (type === "js") requireUncached("../plugins/" + file)

                logger.info("Init Finished " + file)
            } catch (e) {
                logger.error(e)
            }
        }
    }
}

export default new PluginManager();