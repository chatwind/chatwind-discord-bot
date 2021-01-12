const { SlashCommand, CommandOptionType } = require('slash-create');
const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../config.json");

module.exports = class VoiceStatusCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'voicestatus',
      description: 'Returns the current status of the Chatwind voice servers'
    });
    this.filePath = __filename;
  }

  async run(ctx) {
    await ctx.acknowledge(true);
    let statuspageURL = config.statuspageURL;


    let compstatusRes = await fetch(`${statuspageURL}/api/v2/summary.json`);
        let compstatusBody = await compstatusRes.json();

    let comp_status = compstatusBody.components;
    const capitalize = (s) => {
      return s.charAt(0).toUpperCase() + s.slice(1)
    }
    const comp_status_emote = (semoji) => {
        if (semoji === "major_outage") {
          return ":red_circle:";
        }
        if (semoji === "operational") {
          return ":green_circle:";
        }
        if (semoji === "degraded_performance") {
          return ":orange_circle:";
        }
        if (semoji === "under_maintenance") {
          return ":blue_circle:";
        }
    }
    const comp_status_text = (stext) => {
        if (stext === "major_outage") {
          return "Major Outage";
        }
        if (stext === "operational") {
          return "Operational";
        }
        if (stext === "degraded_performance") {
          return "Partial Outage";
        }
        if (stext === "under_maintenance") {
          return "Under Maintenance";
        }
    }

      let embed = new Discord.MessageEmbed()
        .setTitle(comp_status_emote(comp_status[5].status)+" ["+comp_status_text(comp_status[5].status)+"]"+" Chatwind Voice Server Status")
        .addField("**Beta:**", `${comp_status_emote(comp_status[0].status)} ${comp_status_text(comp_status[0].status)}`)
        .setColor("BLUE")
        .setURL(statuspageURL)

    return ctx.send({embeds: [embed]}).catch(e => console.log(e));
  }
}
