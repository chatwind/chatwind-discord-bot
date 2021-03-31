const { Client, Collection } = require("discord.js");
const path = require('path');
const fs = require('fs');
const client = new Client({ disableEveryone: true });
client.categories = fs.readdirSync("./commands/");
client.config = require('./config.json');


client.commands = new Collection();
client.aliases = new Collection();

// 'client.on('message')' commands are triggered when the
// specified message is read in a text channel that the bot is in.

client.login(client.config.token).then(async (token) => {

  ["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
  })

}).catch((e) => {
  console.log(e)
});
