const Discord = require("discord.js");
//packges or const here!
module.exports = {
    name: "docs",
    aliases: ["docs", "d", "documentation"],
    category: "info",
    description: "Get a link to the docs",
    usage: "docs",
    dev: false,
    run: async (client, message, args) => {
//your code goes here!
const embed = new Discord.MessageEmbed()
    .setTitle(`Documentation`)
    .setDescription(`Chatwind currently does not have an API documentation. This is currently in the works!`)
    .setURL(``)
    .setColor("BLUE")

return message.channel.send(embed);
//end code
  }
}
