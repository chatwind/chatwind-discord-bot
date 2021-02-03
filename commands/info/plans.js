const Discord = require("discord.js");
//packges or const here!
module.exports = {
    name: "plans",
    aliases: ["plans", "pricing"],
    category: "info",
    description: "List of the plans for Chatwind",
    usage: "plans",
    dev: false,
    run: async (client, message, args) => {
//your code goes here!
const embed = new Discord.MessageEmbed()
    .setTitle(`Plans`)
    .addField("`Free`", "Access to all of Chatwind, except saved codes")
    .addField("`Education`", `Access to all of Chatwind, plus saved codes (${client.config.prefix}code)\n**NOTE:** This plan is by application only. Check the website to find out how to get this plan.`)
    .setColor("GREEN")

return message.channel.send(embed);
//end code
  }
}
