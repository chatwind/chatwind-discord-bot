const Discord = require("discord.js");
const categories = ["info", "api", "meetings"];

module.exports = {
  name: "help",
  aliases: ["help", "h"],
  category: "info",
  description: "Lists all commands for the Chatwind Discord bot",
  usage: "help <category/command>",
  dev: false,
  run: async (client, message, args, db) => {
    let prefix = client.config.prefix;

    const commandEmbed = new Discord.MessageEmbed()
      .setAuthor(`Command Categories`, message.guild.iconURL())
      .setDescription(`${client.user.username} Help`)
      .addFields(
        {
          name: "`Info`",
          value: `\`\`\`${listCommands(client, "info").join(", ")}\`\`\``,
          inline: true,
        },
        { name: "`API`", value: `\`\`\`${listCommands(client, "api").join(", ")}\`\`\``, inline: true },
        { name: "`Meetings`", value: `\`\`\`${listCommands(client, "meetings").join(", ")}\`\`\``, inline: true }
      )
      .setColor(0x00ae86)
      .setFooter(
        `Requested by ${message.author.tag} | ${client.user.tag}`,
        message.author.avatarURL({ format: "png" })
      )
      .setTimestamp();

    return message.channel.send(commandEmbed);
  },
};

function listCommands(client, category) {
  var commandList = client.commands.filter(
    (cmd) => cmd.category == category.toLowerCase()
  );
  return commandList.map((cmd) => cmd.name);
}
