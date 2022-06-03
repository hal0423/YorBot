const menu = require.main.require("./utils/menu.js");
const { getVtuberWiki } = require.main.require("./utils/vtuber-fetch.js");
const options = [{ "name": "oshi_name", "description": "Enter your Oshi name", "type": 3, "required": true }];
module.exports = {
    "data": {
        "name": "role",
        "description": "assigns a role to the member",
        "options": options
    },
    "execute": async (interaction) => {
        const inputName = interaction.options.getString("oshi_name");
        const vtuber = await getVtuberWiki(inputName);
        if(!vtuber) {
            return await menu(interaction, [{
                "embeds": [{
                    "title": "❌ Cannot find Oshi with the given name",
                    "description": `try again dumb bitch`,
                    "color": "#ff0000"
                }]
            }]);
        }
        const name = vtuber.oshiName;
        const color = vtuber.color;
        const image = vtuber.image_url;
        const member = interaction.member;
        const guild = interaction.guild;
        let role = guild.roles.cache.find(_role => _role.name === name);
        if (!role) {
            role = guild.premiumSubscriptionCount >= 7 ? await interaction.guild.roles.create({
                name: name,
                color: color,
                icon: image
            }) : await guild.roles.create({
                name: name,
                color: color
            });
        }
        if(member.roles.cache.find(_role => _role === role)) {
            await member.roles.remove(role);
            return await menu(interaction, [{
                "embeds": [{
                    "title": "✅ Role Unassigned Successfully",
                    "description": `${role} has been unassigned to you`,
                    "color": "#8400ff"
                }]
            }]);
        }
        await member.roles.add(role);
        return await menu(interaction, [{
            "embeds": [{
                "title": "✅ Role Assigned Successfully",
                "description": `${role} has been assigned to you`,
                "color": "#00ff00"
            }]
        }]);
    }
}