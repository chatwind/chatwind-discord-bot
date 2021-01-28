const { SlashCommand, CommandOptionType } = require('slash-create');
const Discord = require("discord.js");

module.exports = class ServerCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'invite',
      description: 'Get an invite link for the Chatwind Discord Bot'
    });
    this.filePath = __filename;
  }

  async run(ctx) {
    await ctx.acknowledge(true);

    let embed = new Discord.MessageEmbed()
      .setTitle("Invite \`Chatwind Discord Bot\`")
      .setDescription("Invite the bot [here](https://chatwindapp.com/discordbot).")
      .setColor("BLUE")
      .setURL("https://chatwindapp.com/discordbot")

    return ctx.send({embeds: [embed]}).catch(e => console.log(e));
  }
}
