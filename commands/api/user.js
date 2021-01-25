const Discord = require("discord.js");
const moment = require("moment");
const chatwind = require("chatwind.js");
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
    var premium;
    var staff;

    if (!argsUser) return message.channel.send("Please specify a valid \`USERNAME\` to lookup.");

    let bodyUser = await chatwind.user(argsUser);

    const embedInvalid = new Discord.MessageEmbed()
      .setTitle(`No User Found`)
      .setDescription(`I could not find a user with the username \`${argsUser}\` in the Chatwind database.`)
      .setColor("ORANGE")

    const embedblacklist = new Discord.MessageEmbed()
      .setTitle(`User Information for \`${bodyUser.username}\``)
      .addField(`Username:`, `${bodyUser.username}`)
      .addField(`Account Status:`, `Blacklisted`)
      .addField(`Staff:`, `No`)
      .setColor("BLUE")

    if (bodyUser.blacklisted) return message.channel.send(embedblacklist);

    if (bodyUser.exists == false) return message.channel.send(embedInvalid);
    if (bodyUser.exists == true) { var exists = "Exists"; };
    if (bodyUser.staff_status == true) { var staff = "Yes"; };
    if (bodyUser.staff_status == false) { var staff = "No"; };

    if (bodyUser.premium_type == 0) { var premium = "No Premium"; };

    const embed = new Discord.MessageEmbed()
      .setTitle(`User Information for \`${bodyUser.username}\``)
      .addField(`Username:`, `${bodyUser.username}`)
      .addField(`Joined On:`, `${moment(bodyUser.created_at).format("LL")}`)
      .addField(`Premium Type:`, `${premium}`)
      .addField(`Account Status:`, `${exists}`)
      .addField(`Staff:`, `${staff}`)
      .setColor("BLUE")

    await message.channel.send(embed);

  }
}
