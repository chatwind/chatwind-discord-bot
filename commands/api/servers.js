const Discord = require("discord.js");
const chatwind = require("chatwind.js");
//packges or const here!
module.exports = {
  name: "servers",
  aliases: ["servers", "s"],
  category: "api",
  description: "Lists all of the Chatwind servers",
  usage: "servers",
  dev: false,
  run: async (client, message, args) => {

    let servers = await chatwind.servers();
    let serversMessage = `\`\`\`${servers.join('\n')}\`\`\``

    let embed = new Discord.MessageEmbed()
      .setTitle("Chatwind Servers")
      .setDescription(serversMessage)
      .setColor("BLUE")

    message.channel.send(embed)

  }
}
