const Discord = require("discord.js");
const chatwind = require("chatwind.js");
const fetch = require("node-fetch");
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
    let user = await chatwind.user(args[0]);

    let nouser = new Discord.MessageEmbed()
      .setTitle("Error")
      .setDescription(`Please provide a valid user to blacklist!`)
      .setColor("ORANGE")

    if (user.exists == false) return message.channel.send(nouser);
    if (user.blacklisted) return message.channel.send(nouser);

    const response = await fetch(`${client.config.api_url}/blacklist?key=${client.config.staff_key}&username=${args[0]}`, {method: 'GET'});
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
