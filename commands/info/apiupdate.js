const Discord = require("discord.js");
//packges or const here!
module.exports = {
    name: "apiupdate",
    aliases: ["apiupdate", "apiannouncement", "latestapiupdate"],
    category: "info",
    description: "Get the latest API update sent from our Discord server",
    usage: "apiupdate",
    dev: false,
    run: async (client, message, args) => {
//your code goes here!
let channel = await client.channels.cache.get(client.config.channels.apiupdates_channel);

channel.messages.fetch({ limit: 1 }).then(messages => {
  let lastestupdate = messages.first();

const embed = new Discord.MessageEmbed()
    .setTitle(`Latest API Announcement/Update`)
    .setDescription(lastestupdate)
    .setColor("BLUE")

return message.channel.send(embed);
}).catch(console.error);
//end code
  }
}
