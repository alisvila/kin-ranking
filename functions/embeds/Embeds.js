const { EmbedBuilder, Interaction } = require("discord.js");

const { havePermissions } = require("../util/Util");

/**
 * Returns a custom embed
 * @param {Interaction} interaction
 */
function baseEmbed(interaction) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (baseEmbed)");
  }

  const avatar = interaction.user?.displayAvatarURL({ dynamic: true });
  const tag = interaction.user?.tag;

  return new EmbedBuilder()
    .setFooter(tag, avatar)
    .setColor(interaction.guild.members.me.displayColor || "#00FFFF")
    .setTimestamp();
}

/**
 * Returns a custom embed
 * @param {Interaction} interaction
 */
function rootEmbed(interaction) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (baseEmbed)");
  }

  return new EmbedBuilder().setColor(
    interaction.guild.members.me.displayColor || "#00FFFF"
  );
}

/**
 * Returns a custom embed
 * @param {Interaction} interaction
 * @param {string} text
 */
function infoMessage(interaction, text) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (InfoMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (InfoMessage)");
  }

  const embedI = new EmbedBuilder()
    .setDescription(text)
    .setColor(interaction.guild.members.me.displayColor || "#00FFFF");

  return interaction
    .editReply({ embeds: [embedI], allowedMentions: { repliedUser: false } })
    .catch(console.error);
}

/**
 * Returns a custom embed
 * @param {Interaction} interaction
 * @param {string} text
 */
function warnMessage(interaction, text) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (WarnMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (WarnMessage)");
  }

  const embedW = new EmbedBuilder().setDescription(text).setColor("Orange");

  return interaction
    .editReply({
      ephemeral: true,
      embeds: [embedW],
      allowedMentions: { repliedUser: false },
    })
    .catch(console.error);
}

/**
 * Returns a custom embed
 * @param {Interaction} interaction
 * @param {string} text
 */
function errorMessage(interaction, text) {
  if (!interaction) {
    throw Error("'interaction' must be passed down as param! (ErrorMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (ErrorMessage)");
  }

  const embedE = new EmbedBuilder().setDescription(text).setColor("Red");

  return interaction
    .editReply({
      ephemeral: true,
      embeds: [embedE],
      allowedMentions: { repliedUser: false },
    })
    .catch(console.error);
}

/**
 * Send a custom embed to queue textChannel
 * @param {DJS.Client} client
 * @param {object} queue
 * @param {string} text
 * @param {string | number} color
 */
function queueMessage(client, queue, text, color) {
  if (!client) {
    throw Error("'client' must be passed down as param! (queueMessage)");
  }

  if (!queue) {
    throw Error("'queue' must be passed down as param! (queueMessage)");
  }

  if (!text) {
    throw Error("'text' must be passed down as param! (queueMessage)");
  }

  if (!client.utils.havePermissions(queue.metadata.channel))
    return queue.metadata.channel.send({ content: `**$text}**` });

  let colour = queue.guild.members.me.displayColor || "#00FFFF";
  if (color) colour = color;

  const embedQ = new EmbedBuilder().setDescription(text).setColor("Blue");

  return queue.metadata.channel.send({ embeds: [embedQ] });
}

module.exports = {
  baseEmbed,
  rootEmbed,
  infoMessage,
  warnMessage,
  errorMessage,
  queueMessage,
};
