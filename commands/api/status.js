const Discord = require("discord.js");
const fetch = require("node-fetch");
//packges or const here!
module.exports = {
  name: "status",
  aliases: ["status", "st"],
  category: "api",
  description: "Returns the current status of Chatwind",
  usage: "status",
  dev: false,
  run: async (client, message, args) => {
    let statuspageURL = client.config.statuspageURL;


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
        .setTitle("Chatwind Status")
        .addField("**Overall Status:**", `${status_emoji} ${status_main}`)
        .setColor("BLUE")
        .setURL(statuspageURL)

    return message.channel.send(embed);

  }
}
