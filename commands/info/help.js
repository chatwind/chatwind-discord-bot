const Discord = require("discord.js");
//packges or const here!
module.exports = {
    name: "help",
    aliases: ["help", "h"],
    category: "info",
    description: "Provides a list of commands for the bot",
    usage: "help",
    dev: false,
    run: async (client, message, args) => {

var prefix = client.config.prefix;

const embed = new Discord.MessageEmbed()
    .setTitle(`Help`)
    .setDescription(`Here is a list of my commands:`)
    .addField(`Info`, `${prefix}help\n${prefix}docs`)
    .addField(`Guides`, `None`)
    .addField(`API Interaction`, `${prefix}user <USERNAME>`)
    .setColor("BLUE")

await message.channel.send(embed);

  }
}
