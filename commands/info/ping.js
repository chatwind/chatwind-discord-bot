const Discord = require("discord.js");
//packges or const here!
module.exports = {
    name: "ping",
    aliases: ["ping", "pi"],
    category: "info",
    description: "Get the ping for the bot",
    usage: "ping",
    dev: false,
    run: async (client, message, args) => {
//your code goes here!
let embed = new Discord.MessageEmbed()
  .setTitle("<:ping:804468282467287110> Pong!")
  .setDescription(`:heartbeat: Heartbeat: \`${client.ws.ping}ms\``)
  .setColor("GREEN")

return message.channel.send(embed);
//end code
  }
}
