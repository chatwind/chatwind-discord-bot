const superagent = require('superagent');
const chalk = require('chalk');
const util = require("util");

module.exports = async (client) => {

    console.log(chalk.blue(`${client.user.tag} is up and running!`));
    client.user.setActivity(`${client.config.prefix}help`, { type: 'WATCHING' });
}
