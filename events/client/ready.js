const { ActivityType } = require("discord.js");
const mongoose = require("mongoose");
var os = require("os-utils");
const { mongoPass } = require("../../config.json");

module.exports = (client) => {
  const guildin = client.guilds.cache.size;
  const guildmember = client.users.cache.size;

  client.user.setPresence({ status: "online" });
  let textList = [
    " About handling command",
    " in: " + guildin + " Server." + "Serving: " + guildmember + " member",
    `Current Cpu core : ${os.cpuCount()}`,
  ];
  client.user.setPresence({ status: "online" });
  setInterval(() => {
    var text = textList[Math.floor(Math.random() * textList.length)];
    client.user.setActivity(text, { type: ActivityType.Watching });
  }, 3000);

  let allMembers = new Set();
  client.guilds.cache.forEach((guild) => {
    guild.members.cache.forEach((member) => {
      allMembers.add(member.user.id);
    });
  });

  let allChannels = new Set();
  client.guilds.cache.forEach((guild) => {
    guild.channels.cache.forEach((channel) => {
      allChannels.add(channel.id);
    });
  });

  console.log(
    ` ${client.guilds.cache.size} servers `,
    ` ${client.channels.cache.size} channels `,
    ` ${allMembers.size} members `
  );

  mongoose
    .connect(mongoPass, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(console.log(` ${client.user.username} connected to Mongo DB `))
    .catch((err) =>
      console.log(` ${client.user.username} could not connect to mongo DB `)
    );
};
