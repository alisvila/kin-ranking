function loadCommands(client) {
  const fs = require("fs");

  const commandFolders = fs.readdirSync("./Commands");
  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./Commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`../Commands/${folder}/${file}`);
      if (command.name) {
        client.commands.set(command.name, command);
      } else {
        continue;
      }
      if (command.aliases && Array.isArray(command))
        command.aliases.forEach((alias) =>
          client.aliases.set(alias, command.name)
        );
    }
    console.log(table.toString());
  }
}

module.exports = {
  loadCommands,
};
