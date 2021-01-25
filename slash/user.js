const { SlashCommand, CommandOptionType } = require('slash-create');
const Discord = require("discord.js");
const moment = require("moment");
const chatwind = require("chatwind.js");

module.exports = class UserCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'user',
      description: 'Get information about a certain user',
      options: [{
        type: CommandOptionType.STRING,
        name: 'username',
        description: 'Username of the user'
      }]
    });
    this.filePath = __filename;
  }

  async run(ctx) {
    await ctx.acknowledge(true);

    var exists;
    var premium;


    if (!ctx.options.username) return ctx.send("Please specify a valid \`USERNAME\` to lookup.");

    let bodyUser = await chatwind.user(ctx.options.username);

    const embedInvalid = new Discord.MessageEmbed()
      .setTitle(`No User Found`)
      .setDescription(`I could not find a user with the username \`${ctx.options.username}\` in the Chatwind database.`)
      .setColor("ORANGE")

    const embedblacklist = new Discord.MessageEmbed()
      .setTitle(`User Information for \`${bodyUser.username}\``)
      .addField(`Username:`, `${bodyUser.username}`)
      .addField(`Account Status:`, `Blacklisted`)
      .addField(`Staff:`, `No`)
      .setColor("BLUE")

    if (bodyUser.blacklisted) return ctx.send({embeds: [embedblacklist]});

    if (bodyUser.exists == false) return ctx.send({embeds: [embedInvalid]});
    if (bodyUser.exists == true) { var exists = "Yes"; };
    if (bodyUser.exists == false) { var exists = "No"; };
    if (bodyUser.staff_status == true) { var staff = "Yes"; };
    if (bodyUser.staff_status == false) { var staff = "No"; };

    if (bodyUser.premium_type == 0) { var premium = "No Premium"; };

    const embed = new Discord.MessageEmbed()
      .setTitle(`User Information for \`${bodyUser.username}\``)
      .addField(`Username:`, `${bodyUser.username}`)
      .addField(`Joined On`, `${moment(bodyUser.created_at).format("LL")}`)
      .addField(`Premium Type`, `${premium}`)
      .addField(`Exists:`, `${exists}`)
      .addField(`Staff:`, `${staff}`)
      .setColor("BLUE")

    return ctx.send({embeds: [embed]});
  }
}
