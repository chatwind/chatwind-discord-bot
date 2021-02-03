const Discord = require("discord.js");
const chatwind = require("chatwind.js");
//packges or const here!
module.exports = {
  name: "register",
  aliases: ["register", "signup"],
  category: "api",
  description: "Register for Chatwind",
  usage: "register",
  dev: false,
  run: async (client, message, args) => {

    let embed = new Discord.MessageEmbed()
      .setTitle("Chatwind Register")
      .setDescription("Hey there! Signups are currently limited to Beta Testers. To become one, check out our [application](https://apply.chatwindapp.com) page.")
      .setColor("ORANGE")

    message.channel.send(embed)

  }
}
