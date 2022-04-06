const Discord = require('discord.js');
const fs = require("fs");
const config = require('./botconfig.json');
module.exports = {
    name: "resetpass",
    description: "resets a players pass",

    async run (client, message, args){
      const defaut_prefix = "q";
      const user = args[0]
      const pass = args[1]
    if(!message.member.roles.cache.some(r=>[config.cmdperm].includes(r.name)) ) return message.reply(`You can't use this command`);    
      if(args[0] == null)
        return message.reply(`Usage: ${defaut_prefix}forgotpass <playername> <new password>`);

        if(args[1] == null)
        return message.reply(`Usage: ${defaut_prefix}forgotpass <playername> <new password>`);

        if (!fs.existsSync(config.player)) {
        return message.reply("Player Folder not found! Please set on config.json")
      }

      if (!fs.existsSync(config.player + "\\" + "_" + user + ".json")) {
      return  message.reply("Player Not Found!")
    }
      let playername1 = config.player + `\\_${args[0]}.json`
      let playername2 = require(playername1);
          playername2.password = pass;
          fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON(err) {
          if (err)
            return console.log(err);
          message.reply(`Changed password! of player named: ${args[0]}`);
      })
    }
}
