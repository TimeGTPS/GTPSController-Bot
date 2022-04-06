const Discord = require('discord.js');// discord.js
const client = new Discord.Client({disableEveryone: false});
const db = require('quick.db');

const {token, default_prefix} = require ('./config.json');//config.json (start)
const config = require('./config.json');
client.config = config;//config.json (end)
const bcrypt = require("bcrypt");
const fs = require("fs");
const Enmap = require("enmap");
const { readdirSync } = require('fs');
const { join } = require('path');
client.commands= new Discord.Collection();
client.commands = new Enmap();//commands folder (start)
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const files of commandFiles) {
    const command = require (join(__dirname, "commands", `${files}`));
    client.commands.set(command.name, command);
}//commands folder (end)

client.on("error", console.error);
client.on('ready', () => {
    console.log('Bot is now online')
});

let statuses = ['GTPSController By セクシーTime#3810', 'Version 1.0 2022']
setInterval(function() { 

    let status = statuses[Math.floor(Math.random()*statuses.length)];

   // client.user.setActivity(`${client.guilds.cache.size} Servers & ${client.users.cache.size} Users`, { url: 'https://www.twitch.tv/timetopia', type: 'LISTENING'})
   //client.user.setActivity(`Serving ${client.users.cache.size} Users`, { url: 'https://www.twitch.tv/timetopia', type: 'STREAMING' })
  
    client.user.setPresence({activity: { name: status }, status: 'dnd'});

}, 5000)

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    
    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
            db.add(`messages_${message.guild.id}_${message.author.id}`, 1)
        }
    }
})


client.login(token);