import fs from "fs";

class PlayerListManager{
    listObj = {};
    path = "players.json";

    constructor(){
        if(fs.existsSync(this.path)){
            this.listObj = JSON.parse(fs.readFileSync(this.path));
        }
    }

    _ensureList(listName){
        if(this.listObj[listName] === undefined){
            this.listObj[listName] = []
            this._dirty();
        }  
    }
    
    _dirty(){
        fs.writeFileSync(this.path, JSON.stringify(this.listObj))
    }

    has(listName, player){
        this._ensureList(listName);
        return this.listObj[listName].indexOf(player) != -1;
    }

    add(listName, player){
        this._ensureList(listName);
        this.listObj[listName].push(player);
        this._dirty();
    }
}

export default new PlayerListManager();