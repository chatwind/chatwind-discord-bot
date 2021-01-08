const { SlashCommand, CommandOptionType } = require('slash-create');
const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../config.json");

module.exports = class StatusCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'status',
      description: 'Returns the current status of Chatwind'
    });
    this.filePath = __filename;
  }

  async run(ctx) {
    await ctx.acknowledge(true);
    let statuspageURL = config.statuspageURL;


    let statusRes = await fetch(`${statuspageURL}/api/v2/status.json`);
        let statusBody = await statusRes.json();
    let compstatusRes = await fetch(`${statuspageURL}/api/v2/summary.json`);
        let compstatusBody = await compstatusRes.json();

    let status_main = statusBody.status.description;
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
    // STATUS EMOJI
    var status_emoji;
      if (statusBody.status.indicator === "major") {
        var status_emoji = ":red_circle:";
      }
      if (statusBody.status.indicator === "none") {
        var status_emoji = ":green_circle:";
      }
      if (statusBody.status.indicator === "minor") {
        var status_emoji = ":orange_circle:";
      }
      if (statusBody.status.indicator === "maintenance") {
        var status_emoji = ":blue_circle:";
      }

    let embed = new Discord.MessageEmbed()
      .setTitle(status_emoji+" ["+status_main+"]"+" Chatwind Status")
      .addField("**Main Website:**", `${comp_status_emote(comp_status[0].status)} ${comp_status_text(comp_status[0].status)}`)
      .addField("**API:**", `${comp_status_emote(comp_status[1].status)} ${comp_status_text(comp_status[1].status)}`)
      .addField("**CDN:**", `${comp_status_emote(comp_status[2].status)} ${comp_status_text(comp_status[2].status)}`)
      .addField("**Docs:**", `${comp_status_emote(comp_status[3].status)} ${comp_status_text(comp_status[3].status)}`)
      .setColor("BLUE")
      .setURL(statuspageURL)

    return ctx.send({embeds: [embed]}).catch(e => console.log(e));
  }
}
