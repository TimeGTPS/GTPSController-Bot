const Discord = require('discord.js');
const fs = require("fs");
const config = require('./botconfig.json');
module.exports = {
    name: "giverole",
    description: "The help command, what do you expect?",

    async run (client, message, args){
        const defaut_prefix = "q";
        if (message.author.id !== config.cmdperm) return message.reply("Sorry you can't do this command!")
        const user = args[0]
        const role = args[1]

      if (user == null)
      {
      return message.reply(`Command = ${defaut_prefix}giverole [Player] [Role Number]`)
      }
      if (role == null)
      {
      return message.reply(`Command = ${defaut_prefix}giverole [Player] [Role Number]`)
      }
      
      if (!fs.existsSync(config.player)) {
        return message.reply("Player Folder not found! Please set on config.json")
      }

      if (!fs.existsSync(config.player + "\\" + "_" + user + ".json")) {
        return message.reply("Player Not Found!")
      }
      let playername1 = `./` + config.player + `/${args[0]}.json`
      let playername2 = require(playername1);

      const rolenum =  parseInt(role)

      playername2.adminLevel = rolenum;

      fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON(err) {
        if (err)
          return console.log(err);
        return message.reply(`Role has been given!\n\nto player named: ${args[0]}\nGive Role Number: ${args[1]}\n\nPlease Re-login for take the effect`);
        })
      }
    }