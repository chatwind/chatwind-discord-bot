const Discord = require("discord.js");
//packges or const here!
module.exports = {
    name: "support",
    aliases: ["support"],
    category: "info",
    description: "Get support for Chatwind or with the bot",
    usage: "support",
    dev: false,
    run: async (client, message, args) => {
//your code goes here!
const embed = new Discord.MessageEmbed()
    .setTitle(`Support`)
    .setDescription(`Need help? Here are our support links:`)
    .addField(":globe_with_meridians: `Website`", "[https://support.chatwindapp.com](https://support.chatwindapp.com)")
    .addField("<:server:793675993600098335> `Bot`", "[https://discord.gg/GUSz2Wtj9c](https://discord.gg/GUSz2Wtj9c)")
    .addField(":e_mail: `Email Address`", "support@chatwindapp.com")
    .setColor("BLUE")

return message.channel.send(embed);
//end code
  }
}
