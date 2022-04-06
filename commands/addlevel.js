const Discord = require('discord.js');
const fs = require("fs");
const config = require('./botconfig.json');
module.exports = {
    name: "addlevel",

    async run (client, message, args){
        const defaut_prefix = "q";
        if(!message.member.roles.cache.some(r => [config.cmdperm].includes(r.name)))
        return message.reply("Sorry, you don't have permissions to use this!");
        const user = args[0]
        const levels = args[1]

        if (args[0] == null)
        {
        return message.reply(`Usage: ${defaut_prefix}givelevel [Player] [Level]`)
        }

        if (args[1] == null)
        {
        return message.reply(`Usage: ${defaut_prefix}givelevel [Player] [Level]`)
        }

        if (!fs.existsSync(config.player)) {
          return message.reply("Player Folder not found! Please set on config.json")
        }

        fs.access(config.player + `\\_${args[0]}.json`, fs.F_OK, (err) => {
          if (err) {
            return  message.reply("Player Not Found!")
          }

        let playername1 = config.player + `\\_${args[0]}.json`
        let playername2 = require(playername1);
          var contents = fs.readFileSync(playername1);
          var jsonContent = JSON.parse(contents);
          var newlev2 = parseInt(jsonContent.level)
          var levargs = parseInt(levels)
          newlev2 += levargs
     const levelss =  parseInt(newlev2)

      playername2.level = levelss;

      fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON() {
          return message.reply(`✅Level added!\nPlayer: ${args[0]}\nGiven Level: ${args[1]}\nTotal Level: ${playername2.level}`)
        })
      })
    }
}