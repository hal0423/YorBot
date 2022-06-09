const Discord = require('discord.js');
const fs = require("fs");
require('dotenv').config();
require('log-timestamp');
const { Player } = require("discord-player");
const client = new Discord.Client(
    { "intents": ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });
let commands = [];
for (const file of fs.readdirSync("./commands").filter(_file => _file.endsWith(".js"))) {
    const command = require(`./commands/${file}`);
    commands.push(command);
}
client.on("ready", async () => {
        console.log(`discord> Logged in as ${client.user.tag}`);
        await client.application.commands.set(commands.map(_command => _command.data));
        console.log("discord> Commands successfully pushed to Discord API. It may take a while for the changes to be reflected.");
    }
);
client.login(process.env.DISCORD_TOKEN);
client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        try {
            await commands.find(_command => _command.data.name === interaction.commandName).execute(interaction);
        }
        catch (error) {
            console.error(`discord> ${error}`);
        }
    }
});