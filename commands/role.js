const menu = require.main.require("./utils/menu.js");
const { getVtuberWiki } = require.main.require("./utils/vtuber-fetch.js");
const options = [{ "name": "oshi_name",
                    "description": "Enter your Oshi name",
                    "type": 3,
                    "required": true
                }];
module.exports = {"data": {
        "name": "role",
        "description": "Assigns a vtuber role to the member",
        "options": options
    }, "execute": async (interaction) => {
        if(!interaction.guild.me.permissions.has("MANAGE_ROLES")) {
            return await menu(interaction, [{
                "embeds": [{
                    "title": "❌ Bot has insufficient permissions to perform this action",
                    "description": `Please ask a mod to allow me to do so uwu`,
                    "color": "#ff0000"
                }]
            }]);
        }
        const inputName = interaction.options.getString("oshi_name");
        const vtuber = await getVtuberWiki(inputName);
        if(!vtuber) {
            return await menu(interaction, [{
                "embeds": [{
                    "title": "❌ Cannot find Oshi with the given name",
                    "description": `Please try again`,
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
                icon: image,
                mentionable: true
            }) : await guild.roles.create({
                name: name,
                color: color,
                mentionable:true
            });
            console.log(`vtuber-fetch.js> Role not existed, created a new role ${role.id}:${role.name}`);
        }
        if(member.roles.cache.find(_role => _role === role)) {
            await member.roles.remove(role);
            return await menu(interaction, [{
                "embeds": [{
                    "title": "✅ Role unassigned successfully",
                    "description": `${role} has been unassigned to you`,
                    "color": "#fff200"
                }]
            }]);
        }
        await member.roles.add(role);
        console.log(`Successfully assigned ${role.id}:${role.name} to ${member.id}:${member.user.tag}\n`);
        return await menu(interaction, [{
            "embeds": [{
                "title": "✅ Role assigned successfully",
                "description": `${role} has been assigned to you`,
                "color": "#00ff00"
            }]
        }]);
    }}