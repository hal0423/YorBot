const { removeBackgroundFromImageUrl } = require("remove.bg");
require('log-timestamp');

const removebg = async (url) => {
    let base64Output;
    const output = await removeBackgroundFromImageUrl({
        url,
        apiKey: process.env.REMOVEBG_TOKEN,
        size: "preview",
        type: "person"
    });

    console.log(`removebg.js> Successfully removed bg`);
    base64Output = output.base64img;
    return base64Output;
}

exports.removebg = removebg;