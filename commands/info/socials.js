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
    .addField("<:discord_full:773730321211588666> `Discord`", `[GUSz2Wtj9c](https://chatwindapp.com/discord)`)
    .addField("<:twitter:826929756687695882> `Twitter`", `[@chatwindapp](https://chatwindapp.com/twitter)`)
    .addField("<:twitch:773729183532711962> `Twitch`", `[@chatwindapp](https://chatwindapp.com/twitch)`)
    .addField("<:youtube:826929152694288445> `YouTube`", `[Chatwind](https://chatwindapp.com/youtube)`)
    .setColor("BLUE")

return message.channel.send(embed);
//end code
  }
}
