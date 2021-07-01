const { Client, Collection } = require("discord.js");
const path = require('path');
const fs = require('fs');
const client = new Client({ disableEveryone: true });
const { Database } = require("quickmongo");

client.categories = fs.readdirSync("./commands/");
client.config = require('./config.json');


client.commands = new Collection();
client.aliases = new Collection();
client.db = new Database(client.config.mongo_url);

["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
})

client.login(client.config.token).catch((e) => {
  console.log(e)
});
