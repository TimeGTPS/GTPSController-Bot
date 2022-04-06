const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "The help command, what do you expect?",

    async run (client, message, args){
           
        const defaut_prefix = "q";
        const moderation = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('✅|Help Commands')
        .addField(`${defaut_prefix}resetpass`, '[Player] [New Password] (Changing Password of A Specific User)')
        .addField(`${defaut_prefix}addgems`, '[Player] [Gem Amount] (Gives Gems to A Specific User)')
        .addField(`${defaut_prefix}addlevel`, '[Player] [Level Amount] (Gives Levels to A Specific User)')
        .addField(`${defaut_prefix}giverole`, '[Player] [rank number] (Gives Rank to A Specific User)')
        .setFooter(`GTPSController Bot (c) 2022`, client.user.displayAvatarURL())
        .setTimestamp()
        message.channel.send(moderation);

       
    }
}
