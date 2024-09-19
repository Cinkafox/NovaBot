import PlayerListManager from "../managment/PlayerListManager.js";
import PluginManager from "../managment/PluginManager.js";


function checkAdmin(context, args){
    let message = context.Message;
    if(!PlayerListManager.has("admin", context.Author)){

        context.sendMessage("UwU! Пвости! Но я вынувдена тебя запетуфарить >w< Ты меня наебаль >v<")
        PlayerListManager.add("ignore", context.Author);
        return 
    }

    let ping = message.mentions.members.first();
    let userName = args[1];

    if(ping != undefined){
        userName = ping.user.username;
    }

    if(userName === undefined){
        context.sendMessage("А пользователь...")
        return;
    }

    return userName;
}

PluginManager.CreatePlugin("оффнись", async(argc, context) => {
    if(!PlayerListManager.has("admin", context.Author)){

        context.sendMessage("UwU! Пвости! Но я вынувдена тебя запетуфарить >w< Ты меня наебаль >v<")
        PlayerListManager.add("ignore", context.Author);
        return 
    }

    process.exit(1);
})

PluginManager.CreatePlugin("бан",async (args, context)=>{
    let userName = checkAdmin(context, args);

    if(userName === undefined)
        return;

    context.sendMessage("Успешно запетушарен " + userName)
    PlayerListManager.add("ignore", userName);
})

PluginManager.CreatePlugin("разбан",async (args, context)=>{
    let userName = checkAdmin(context, args);

    if(userName === undefined)
        return;

    context.sendMessage("Успешно распетушарен " + userName)
    PlayerListManager.remove("ignore", userName);
})

PluginManager.CreatePlugin("админ",async (args, context)=>{
    let userName = checkAdmin(context, args);

    if(userName === undefined)
        return;

    context.sendMessage("Ого.. это же мой очередной... владецел - " + userName + ". Прошу.. не бей меня сильно~~")
    PlayerListManager.add("admin", userName);
})

PluginManager.CreatePlugin("деадмин",async (args, context)=>{
    let userName = checkAdmin(context, args);

    if(userName === undefined)
        return;

    context.sendMessage("ХА! Теперь у него нет надо мной власти!")
    PlayerListManager.remove("admin", userName);
})

PluginManager.CreatePlugin("запетушаренные",async (args, context)=>{

    let text = "Мой личный черный список UwU:\n"
    for(let a of PlayerListManager.list("ignore")){
        text += " - " + a + "\r"
    }
    context.sendMessage(text)
})