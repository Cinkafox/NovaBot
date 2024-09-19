import PluginManager from "../managment/PluginManager.js";
import https from "https";
import http from "http";
import url from "url";
import tiny from "tiny-json-http";
import { MessageAttachment } from "discord.js-selfbot-v13";


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

    let portBuilder = parsed.port != null ? ":" + parsed.port : "";
    let buildedUrl = parsed.protocol + "//" + parsed.hostname + portBuilder + parsed.path + "status";

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

PluginManager.CreatePlugin("рисуй",async (args,m) =>{
    let res = await tiny.post({url:"https://api.proxyapi.ru/openai/v1/images/generations",headers:{
        "Authorization":"Bearer " + process.env.AI_KEY
    },data:{
        "model": "dall-e-3",
        "prompt": args[1],
        "n": 1,
        "size": "512x512"
    }});

    console.log(res.body.data[0].url)

    //let img = await tiny.get({url: res.body.data[0].url});

    m.sendMessage({
        content: "на",
        files: [
            {attachment: res.body.data[0].url, name: "image.png"},
            ]
    })
})