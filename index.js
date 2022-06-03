const Discord = require('discord.js');
const fs = require("fs");
require('dotenv').config();
const client = new Discord.Client(
    { "intents": ["GUILDS", "GUILD_MESSAGES"] });
const commands = [];
for (const file of fs.readdirSync("./commands").filter(_file => _file.endsWith(".js"))) {
    const command = require(`./commands/${file}`);
    commands.push(command);
}
client.on("ready", async () => {
    console.log(`discord>Logged in as ${client.user.tag}`);
    }
);
client.login(process.env.TOKEN);
client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        try {
            await commands.find(_command => _command.data.name === interaction.commandName).execute(interaction);
        }
        catch (error) {
            console.log(`discord>${error}`);
        }
    }
});