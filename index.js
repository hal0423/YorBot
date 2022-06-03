const Discord = require('discord.js');
const fs = require("fs");
require('dotenv').config();
const globalVtubers = require("./utils/global-vtubers.js");
const client = new Discord.Client(
    { "intents": ["GUILDS", "GUILD_MESSAGES"] });
const commands = [];
for (const file of fs.readdirSync("./commands").filter(_file => _file.endsWith(".js"))) {
    const command = require(`./commands/${file}`);
    commands.push(command);
}
client.on("ready", async () => {
    await client.application.commands.set(commands.map(_command => _command.data));
    console.log(`discord>Logged in as ${client.user.tag}`);
    await globalVtubers.init();
    console.log("Global Vtubers object initialized");
    }
);
client.login(process.env.TOKEN);
// client.on('message', (msg) => {
//     if (msg.content === 'yor') msg.reply('nigger');
// });
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