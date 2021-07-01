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
  .setDescription("Invite the bot [using this link](https://discord.com/oauth2/authorize?client_id=795537043069468713&scope=bot&permissions=379968).")
  .setColor("BLUE")
  .setURL("https://discord.com/oauth2/authorize?client_id=795537043069468713&scope=bot&permissions=379968")

return message.channel.send(embed);
//end code
  }
}
