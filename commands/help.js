const menu = require.main.require("./utils/menu.js");
module.exports = {
    "data": {
        "name": "help",
        "description": "says Loidy san to anya chan ga daisuki"
    },
    "execute": async (interaction) => {
        return await menu(interaction, [{
            "embeds": [{
                "title": "📖 dm saki",
                "description": "dm saki",
                "color": "#ff007f"
            }]
        }]);
    }
}