import PluginManager from "../managment/PluginManager.js";
import url from "url";
import tiny from "tiny-json-http";


var YesNo = ["Агась!", "Неа!", "Точно нет!", "Наверн да", "Естественно!", "Ясень пень!", "хз лол!", "Лучше не!", "Ясное дело!", "Капец! тычо куку? нет конечн!", "Ты чооооо! естественно да!"];

PluginManager.CreatePlugin("правда",(args, context) =>{
    let selection = YesNo[Math.floor(Math.random() * YesNo.length)]
    context.sendMessage(selection)
})

PluginManager.CreatePlugin("статус",async (args, context) =>{

    let parsed = url.parse(args[1]);
    
    if(parsed.protocol === "ss14:"){
        parsed.protocol = "http:"
        if(parsed.port === null){
            parsed.port = 1212;
        }
    }else{
        parsed.protocol = "https:"
    }

    var toPath = ""

    if(!parsed.path.endsWith("/")){
        toPath = "/"
    }

    let portBuilder = parsed.port != null ? ":" + parsed.port : "";
    let buildedUrl = parsed.protocol + "//" + parsed.hostname + portBuilder + parsed.path + toPath + "status";

    console.log(buildedUrl)
    let data = await getDat(buildedUrl);
    let str = "Статус: \n Название:" + data.name + "\n Онлайн:" + data.players + " / " + data.soft_max_players;
    context.sendMessage(str)
})

async function getDat(url){
    let resp = await tiny.get({
        url: url
    })

    let data = resp.body;

    if(resp.headers.location !== undefined) 
        return await getDat(resp.headers.location);

    console.log(data)
    console.log(resp.headers)

    return data;
}
