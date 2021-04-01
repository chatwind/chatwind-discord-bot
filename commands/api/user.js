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

return message.channel.send("<a:loading:784127487118016573> Fetching data from the Chatwind API. Please wait").then(async (msg) => {

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
    if (bodyUser.message == "User not found") return message.channel.send(embedInvalid);

    if (bodyUser.staff == true) { var staff = "Yes"; };
    if (bodyUser.staff == false) { var staff = "No"; };

    if (bodyUser.premium == 0) { var premium = "No Premium"; };
    if (bodyUser.premium == 2) { var premium = "Education"; };
    const joined_at = moment(bodyUser.created_at).format("LL");

    const embed = new Discord.MessageEmbed()
      .setTitle(`User Information for \`${bodyUser.username}\``)
      .addField(`Username:`, `${bodyUser.username}`)
      .addField(`Joined On:`, `${joined_at}`)
      .addField(`Premium Type:`, `${premium}`)
      .addField(`Staff:`, `${staff}`)
      .setColor("BLUE")

    await msg.edit("", embed);
});

  }
}
