const menu = require.main.require("./utils/menu.js");
require('log-timestamp');
module.exports = {
    "data": {
        "name": "ping",
        "description": "Get network latency"
    },
    "execute": async (interaction) => {
        return await menu(interaction, [{
            "embeds": [{
                "title": "🏓 Ping",
                "description": `Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${interaction.client.ws.ping}ms`,
                "color": "#007fff"
            }]
        }]);
    }
}