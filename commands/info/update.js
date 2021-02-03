const Discord = require("discord.js");
//packges or const here!
module.exports = {
    name: "update",
    aliases: ["update", "announcement", "latestupdate"],
    category: "info",
    description: "Get the latest update sent from our Discord server",
    usage: "update",
    dev: false,
    run: async (client, message, args) => {
//your code goes here!
let channel = await client.channels.cache.get(client.config.channels.updates_channel);

channel.messages.fetch({ limit: 1 }).then(messages => {
  let lastestupdate = messages.first();

const embed = new Discord.MessageEmbed()
    .setTitle(`Latest Announcement/Update`)
    .setDescription(lastestupdate)
    .setColor("BLUE")

return message.channel.send(embed);
}).catch(console.error);
//end code
  }
}
