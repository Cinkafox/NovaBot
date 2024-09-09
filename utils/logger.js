import fs from "node:fs";

class Logger
{
    Reset = "\x1b[0m";
    Bright = "\x1b[1m";
    Dim = "\x1b[2m";
    Underscore = "\x1b[4m";
    Blink = "\x1b[5m";
    Reverse = "\x1b[7m";
    Hidden = "\x1b[8m";

    FgBlack = "\x1b[30m";
    FgRed = "\x1b[31m";
    FgGreen = "\x1b[32m";
    FgYellow = "\x1b[33m";
    FgBlue = "\x1b[34m";
    FgMagenta = "\x1b[35m";
    FgCyan = "\x1b[36m";
    FgWhite = "\x1b[37m";
    FgGray = "\x1b[90m";

    BgBlack = "\x1b[40m";
    BgRed = "\x1b[41m";
    BgGreen = "\x1b[42m";
    BgYellow = "\x1b[43m";
    BgBlue = "\x1b[44m";
    BgMagenta = "\x1b[45m";
    BgCyan = "\x1b[46m";
    BgWhite = "\x1b[47m";
    BgGray = "\x1b[100m";

    DebugEnabled = process.env.DEBUG === "true";

    Data = Date.now()

    #print(level,messages)
    {
        for(let message of messages.split("\n")){
            if(message === "") continue;
            const text = `[${level}${this.Reset}] ${message} \n`;
            process.stdout.write(text);
            this.#logToFile(message);
        }
    }
    
    #logToFile(text){
        const logDate = new Date().toISOString()
        fs.appendFileSync("logs/"+this.Data+".log",`[${logDate}] ${ text}\n`)
    }

    info(){
        this.#print(this.FgMagenta+"INFO",[...arguments].join(" "));
    }

    error(){
        this.#print(this.FgRed+"ERRO",[...arguments].join(" "));
    }

    debug(){
        if(this.DebugEnabled)
            this.#print(this.FgBlue+"DEBU",[...arguments].join(" "));
    }
}

export default new Logger()