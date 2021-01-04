const Discord = require("discord.js");
const fetch = require("node-fetch");
//packges or const here!
module.exports = {
  name: "user",
  aliases: ["user", "u"],
  category: "api",
  description: "Get information about a certain user",
  usage: "user <USERNAME>",
  dev: false,
  run: async (client, message, args) => {

    let argsUser = args[0];
    var exists;

    if (!argsUser) return message.channel.send("Please specify a valid \`USERNAME\` to lookup.");

    let resUser = await fetch(`https://api.chatwind.ga/v1/user?username=${argsUser}`);
    let bodyUser = await resUser.json();

    const embedInvalid = new Discord.MessageEmbed()
      .setTitle(`No User Found`)
      .setDescription(`I could not find a user with the username \`${argsUser}\` in the Chatwind database.`)
      .setColor("ORANGE")

    if (bodyUser.exists == "false") return message.channel.send(embedInvalid);
    if (bodyUser.exists == "true") { var exists = "Yes"; };
    if (bodyUser.exists == "false") { var exists = "No"; };

    const embed = new Discord.MessageEmbed()
      .setTitle(`User Information for \`${bodyUser.username}\``)
      .addField(`Username:`, `${bodyUser.username}`)
      .addField(`Exists:`, `${exists}`)
      .setColor("BLUE")

    await message.channel.send(embed);

  }
}
