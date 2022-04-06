const Discord = require('discord.js');
const fs = require("fs");
const config = require('./botconfig.json');
const bcrypt = require("bcrypt");
module.exports = {
    name: "addgems",
    description: "The help command, what do you expect?",

    async run (client, message, args){
        //if (message.author.id !== '1231231231231' && message.author.id !== '933749403146125454') return message.reply("Sorry you can't do this command!")
        const user = args[0]
        const gems = args[1]

        if (args[0] == null)
        {
        return message.reply(`Usage: qaddgems [Player] [Gems Amount]`)
        }

        if (args[1] == null)
        {
        return message.reply(`Usage: qaddgems [Player] [Gems Amount]`)
        }

        if (fs.existsSync(config.gemconf + `\\_${args[0]}.txt`)) {

          if (!fs.existsSync(config.gemconf + `\\_${args[0]}.txt`)) {
            return message.reply("Player not found!")
          }

          let gemdb2 = config.gemconf + `\\_${args[0]}.txt`

          var contents1 = fs.readFileSync(gemdb2);
          var newgem3 = parseInt(contents1)
          var gemargs2 = parseInt(gems)
          newgem3 += gemargs2
          const gemssdb =  parseInt(newgem3)
          fs.writeFile(gemdb2, gemssdb.toString(), function() {
            const rgemdb = fs.readFileSync(gemdb2)
            return message.reply(`Gems has been added!\n\nto the player named: ${args[0]}\nGems Amount: ${args[1]}\nTotal Gems: ${rgemdb}\n\nPlease Re-login for take the effect`)
          })
          return
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
          var newgem2 = parseInt(jsonContent.gems)
          var gemargs = parseInt(gems)
          newgem2 += gemargs
     const gemss =  parseInt(newgem2)

      playername2.gems = gemss;

      fs.writeFile(playername1, JSON.stringify(playername2), function writeJSON() {
          return message.reply(`Gems has been added!\n\nto the player named: ${args[0]}\nGems Amount: ${args[1]}\nTotal Gems: ${playername2.gems}\n\nPlease Re-login for take the effect`)
        })
      })
    }
}