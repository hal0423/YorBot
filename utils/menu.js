module.exports = async (interaction, pages) => {
    let count = 0;
    await interaction.reply(pages[count]);
    if (pages.length !== 1) {
        if (!interaction.member) await interaction.user.createDM();
        pages[count].components = [{
            "type": 1,
            "components": [
                { "type": 2, "style": 1, "emoji": "866618910845829130", "custom_id":"button_prev" },
                { "type": 2, "style": 1, "emoji": "866618910861164574", "custom_id":"button_next" }
            ]
        }];
        const reply = await interaction.editReply(pages[count]);
        const collector = reply.createMessageComponentCollector({ "idle": 60 * 1000 });
        collector.on("collect", async component => {
            if (component.customId === "button_prev") count -= 1;
            else if (component.customId === "button_next") count += 1;
            if (count < 0) count = pages.length - 1;
            else if (count > pages.length - 1) count = 0;
            await component.update(pages[count]);
        });
        collector.on("end", async () => {
            pages[count].components = [];
            await reply.edit(pages[count]);
        });
        return collector;
    }
}