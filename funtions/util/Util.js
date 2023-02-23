const DJS = require("discord.js");

/**
 * Check if the client has the default permissions
 * @param {DJS.Interaction | DJS.TextChannel} resolveable
 * @returns {boolean}
 */
function havePermissions(resolveable) {
  const ch = "channel" in resolveable ? resolveable.channel : resolveable;
  if (ch instanceof DJS.ThreadChannel || ch instanceof DJS.DMChannel)
    return true;
  return (
    ch.permissionsFor(resolveable.guild.members.me)?.has("ViewChannel") &&
    ch.permissionsFor(resolveable.guild.members.me)?.has("SendMessages") &&
    ch.permissionsFor(resolveable.guild.members.me)?.has("EmbedLinks")
  );
}

module.exports = {
  havePermissions,
};
