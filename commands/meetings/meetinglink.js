const Discord = require("discord.js");
const chatwind = require("chatwind.js");
const {
  Database
} = require("quickmongo");
//packges or const here!
module.exports = {
  name: "meetinglink",
  aliases: ["meetinglink", "ml", "code"],
  category: "meetings",
  description: "Get a link to this servers meeting URL | Set is optional",
  usage: "meetinglink",
  dev: false,
  run: async (client, message, args) => {
    //your code goes here!

    const db = new Database(client.config.mongo_url);
    const educationDB = db.createModel("educationServers");

    return message.channel.send("<a:loading:784127487118016573> Fetching data from the Chatwind API. Please wait").then(async (msg) => {

      const educationExists = await educationDB.exists(message.guild.id + "_education");
      const educationGet = await educationDB.get(message.guild.id + "_education");

      const errorEmbedNoAccess = new Discord.MessageEmbed()
        .setTitle(`Custom Meeting Links`)
        .setDescription(`Hey there! This server does not have the \`Custom Meeting Links\` feature enabled. This feature is currently locked to users on the \`Education\` plan. For a list of plans, check \`${client.config.prefix}plans\`.\n\nAlready have the \`Education\` plan? Join the official Discord server [here](https://chatwindapp.com/discord) (https://chatwindapp.com/discord) and we can help you out there.`)
        .setColor("RED")
      const errorEmbedNoCode = new Discord.MessageEmbed()
        .setTitle(`Custom Meeting Links`)
        .setDescription(`Hey there! This server does not have a custom meeting code setup! Try emailing us at \`support@chatwindapp.com\`.`)
        .setColor("RED")

      if (educationExists === true) {
        var codeBoolean = true;
      } else {
        var codeBoolean = false;
      };
      if (codeBoolean == false) return msg.edit("", errorEmbedNoAccess);
      let chatwindCustomCode = await chatwind.customcode(educationGet);
      if (chatwindCustomCode.exists == false) return msg.edit("", errorEmbedNoCode);

      const codeEmbed = new Discord.MessageEmbed()
        .setTitle(`Custom Meeting Links`)
        .addField("**Code:**", `\`${chatwindCustomCode.code}\``, true)
        .addField("**Licensee:**", `${chatwindCustomCode.licensee.username}`, true)
        .addField("**Exists:**", `True`, true)
        .setColor("GREEN")

      return msg.edit("", codeEmbed);
    });
    //end code
  }
}
