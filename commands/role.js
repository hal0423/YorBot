const menu = require.main.require("./utils/menu.js");
const globalVtubers = require.main.require("./utils/global-vtubers.js");
const options = [{ "name": "Hololive Oshi", "description": "Enter your Oshi name", "type": 3 }];
module.exports = {
    "data": {
        "name": "role",
        "description": "assigns a role to the member"
    },
    "execute": async (interaction) => {
        const inputName = interaction.options.getString("Hololive Oshi");
        const vtuber = globalVtubers.getVtuber(inputName);
        const oshiName = vtuber.en_name;
        const oshiImage = vtuber.image;

        if(!vtuber) {
            return await menu(interaction, [{
                "embeds": [{
                    "title": "⚠️Error",
                    "description": "Oshi name not found",
                    "color": "#ff0000"
                }]
            }]);
        }

        const member = interaction.member;
        const role = member.guild.roles.cache.find(role => role.name === oshiName);
        if (!role) {
            interaction.guild.roles.create({
                data: {
                    name: oshiName,
                    color: 'BLACK', //TODO
                    icon: oshiImage
                }
            })
        }
        member.roles.add(role);
        return await menu(interaction, [{
            "embeds": [{
                "title": "✅ Role Assigned Successfully",
                "description": `${role} has been assigned to you`,
                "color": "#00ff00"
            }]
        }]);
    }
}