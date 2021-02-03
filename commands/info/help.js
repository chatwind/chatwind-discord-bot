const Discord = require("discord.js");
const categories = ["info", "api", "meetings"];
//packges or const here!
module.exports = {
    name: "help",
    aliases: ["help", "h"],
    category: "info",
    description: "Lists all commands for the Chatwind Discord bot",
    usage: "help <category/command>",
    dev: false,
    run: async (client, message, args, db) => {
        let commandList;
        let prefix = client.config.prefix;
        if(!args.length){
              const commandEmbed = new Discord.MessageEmbed()
                  .setAuthor(`Command Categories`, message.guild.iconURL())
                  .setDescription(`${client.user.username} Help`)
                  .addFields(
                      { name: "`Info`", value: `${prefix}help info`, inline: true },
                      { name: "`API`", value: `${prefix}help api`, inline: true },
                      { name: "`Meetings`", value: `${prefix}help meetings`, inline: true },
                  ).setColor(0x00AE86)
                  .setFooter(`Requested by ${message.author.tag} | ${client.user.tag}`, message.author.avatarURL({ format: 'png' }))
                  .setTimestamp()

              return message.channel.send(commandEmbed);
        }

        if (categories.includes(args[0].toLowerCase())) {
            let categoryName = args[0][0].toUpperCase() + args[0].slice(1).toLowerCase();
            commandList = client.commands.filter(cmd => cmd.category == args[0].toLowerCase());
            commandList = commandList.map(cmd => cmd.name);
            const categoryEmbed = new Discord.MessageEmbed()

            .setAuthor(`${categoryName}`, message.guild.iconURL())
            .setDescription(`Commands: \`\`\`\n${commandList.join(", ")}\`\`\` `)
            .setColor(0x00AE86)
            .setFooter(`Requested by ${message.author.tag} | ${client.user.tag}`, message.author.avatarURL({ format: 'png' }))
            .setTimestamp()

            return message.channel.send(categoryEmbed);
        } else {
            let commandName = args[0].toLowerCase();
            let cmd;
            var error = new Discord.MessageEmbed();
              error.setTitle(`Error`);
              error.setDescription(`An error has occured, here is the info: \n\n **No such command or alias**`);
              error.setColor("RED");
              error.setFooter(`Requested by ${message.author.tag} | ${client.user.tag}`, message.author.avatarURL({ format: 'png' }));
              error.setTimestamp();

            if (client.commands.has(commandName))
                cmd = client.commands.get(commandName)
            else if (client.aliases.has(commandName))
                cmd = message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            else
                return message.channel.send(error);

            const cmdHelp = new Discord.MessageEmbed()

                .setAuthor(`${cmd.name} Command Help`, message.guild.iconURL())
                .setDescription(`Aliases: \`${cmd.aliases.join(", ")}\`\nUsage: \`${cmd.usage}\`\nDescription: \`\`\`${cmd.description}\`\`\``)
                .setColor(0x00AE86)
                .setFooter(`Requested by ${message.author.tag} | ${client.user.tag}`, message.author.avatarURL({ format: 'png' }))
                .setTimestamp()

            message.channel.send(cmdHelp);
        }
    //end code
  }
}
