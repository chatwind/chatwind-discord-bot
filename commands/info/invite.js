const Discord = require("discord.js");
//packges or const here!
module.exports = {
    name: "invite",
    aliases: ["invite"],
    category: "info",
    description: "Get an invite link for the Chatwind Discord Bot",
    usage: "invite",
    dev: false,
    run: async (client, message, args) => {
//your code goes here!
let embed = new Discord.MessageEmbed()
  .setTitle("Invite \`Chatwind Discord Bot\`")
  .setDescription("Invite the bot [here](https://chatwindapp.com/discordbot).")
  .setColor("BLUE")
  .setURL("https://chatwindapp.com/discordbot")

return message.channel.send(embed);
//end code
  }
}
