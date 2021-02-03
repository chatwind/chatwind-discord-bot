const Discord = require("discord.js");
//packges or const here!
module.exports = {
    name: "socials",
    aliases: ["socials", "socialmedias"],
    category: "info",
    description: "Get a link to our socials",
    usage: "socials",
    dev: false,
    run: async (client, message, args) => {
//your code goes here!
const embed = new Discord.MessageEmbed()
    .setTitle(`Chatwind Socials`)
    .addField("`Discord`", `[GUSz2Wtj9c](https://chatwindapp.com/discord)`)
    .addField("`Twitter`", `[@chatwindapp](https://chatwindapp.com/twitter)`)
    .addField("`Twitch`", `[@chatwindapp](https://chatwindapp.com/twitch)`)
    .addField("`YouTube`", `[Chatwind](https://chatwindapp.com/youtube)`)
    .setColor("BLUE")

return message.channel.send(embed);
//end code
  }
}
