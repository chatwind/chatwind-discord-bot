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
    .setTitle(`API Documentation`)
    .setDescription(`You can access the Chatwind API documentation at [https://docs.chatwindapp.com](https://docs.chatwindapp.com)`)
    .setURL(`https://docs.chatwindapp.com`)
    .setColor("BLUE")

return message.channel.send(embed);
//end code
  }
}
