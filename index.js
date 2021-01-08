const { Client, Collection } = require("discord.js");
const { SlashCreator, GatewayServer } = require('slash-create');
const path = require('path');
const fs = require('fs');
const client = new Client({ disableEveryone: true });
client.categories = fs.readdirSync("./commands/");
client.config = require('./config.json');
client.settings = require('./settings.json');
const creator = new SlashCreator({
  applicationID: client.config.applicationID,
  publicKey: client.config.publicKey,
  token: client.config.token,
});


client.commands = new Collection();
client.aliases = new Collection();

// 'client.on('message')' commands are triggered when the
// specified message is read in a text channel that the bot is in.

creator
  .withServer(
    new GatewayServer(
      (handler) => client.ws.on('INTERACTION_CREATE', handler)
    )
  )
  .registerCommandsIn(path.join(__dirname, 'slash'))
  .syncCommands();

client.login(client.config.token).then(async (token) => {

  ["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
  })

}).catch((e) => {
  console.log(e)
});
