const { SlashCommand, CommandOptionType } = require('slash-create');
const Discord = require("discord.js");
const chatwind = require("chatwind.js");

module.exports = class ServerCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'servers',
      description: 'Get a list of voice servers for Chatwind'
    });
    this.filePath = __filename;
  }

  async run(ctx) {
    await ctx.acknowledge(true);
    let servers = await chatwind.servers();
    let serversMessage = `\`\`\`${servers.join('\n')}\`\`\``

    let embed = new Discord.MessageEmbed()
      .setTitle("Chatwind Voice Servers")
      .setDescription(serversMessage)
      .setColor("BLUE")

    return ctx.send({embeds: [embed]}).catch(e => console.log(e));
  }
}
