const Discord = require("discord.js");
const chatwind = require("chatwind.js");
const fetch = require("node-fetch");
let reason_count = 4;
//packges or const here!
module.exports = {
  name: "blacklist",
  aliases: ["blacklist", "ban"],
  category: "site-mods",
  description: "Blacklist a user from the website",
  usage: "blacklist {USERNAME}",
  dev: false,
  run: async (client, message, args) => {

    if (!message.member.roles.cache.find(r => r.id === client.config.sitemod_id)) return;
    let nouser = new Discord.MessageEmbed()
      .setTitle("Error")
      .setDescription(`Please provide a valid user to blacklist!`)
      .setColor("ORANGE")
    let noreason = new Discord.MessageEmbed()
      .setTitle("Error")
      .setDescription(`Please provide a valid reason ID for this blacklist! (Reason IDs can be found in <#802959413132001330>).`)
      .setColor("ORANGE")

    if (!args[0]) return message.channel.send(nouser);
    let user = await chatwind.user(args[0]);
    if (user.exists == false) return message.channel.send(nouser);
    if (!args[1]) return message.channel.send(noreason);

    if (user.blacklisted) return message.channel.send(nouser);
    if (isNaN(args[1]) == true) return message.channel.send(noreason);
    if (args[1] < 1) return message.channel.send(noreason);
    if (args[1] > reason_count) return message.channel.send(noreason);

    const response = await fetch(`${client.config.api_url}/blacklist?key=${client.config.staff_key}&username=${args[0]}&reason=${args[1]}`, {method: 'GET'});
    const json = await response.json();

    let errorembed = new Discord.MessageEmbed()
      .setTitle("Error")
      .setDescription(`It looks like there was an error on our end! Here are the details:\n\n\`${json.message}\``)
      .setColor("RED")

    let successembed = new Discord.MessageEmbed()
      .setTitle("Success")
      .setDescription(`I have successfully blacklisted \`${args[0]}\` from the Chatwind platform.`)
      .setColor("GREEN")

    if (json.error == true) return message.channel.send(errorembed);
    if (json.blacklisted) return message.channel.send(successembed);

  }
}
