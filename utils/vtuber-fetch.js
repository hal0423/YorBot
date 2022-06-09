const { wiki } = require("vtuber-wiki");
const { getAverageColor } = require('fast-average-color-node');
const decode = require('urldecode');
require('log-timestamp');
const setColorOnVtuber = async (vtuber) => {
    vtuber.color = (await getAverageColor(vtuber.image_url)).hex;
    console.log("vtuber-fetch.js> Vtuber color has successfully set to " + vtuber.color);
}

const setNameOnVtuber = (vtuber) => {
    const url = decode(vtuber.more);
    const index = url.indexOf("wiki/");
    vtuber.oshiName = url.substring(index + 5).replaceAll("_", " ");
    console.log("vtuber-fetch.js> Vtuber name has successfully set to " + vtuber.oshiName);
}

const getVtuberWiki = async (name) => {
    let vtuber = await wiki(name);
    if(!vtuber) return;
    console.log("vtuber-fetch.js> Successfully loaded " + vtuber.more + " object from vtuber-wiki");
    await setColorOnVtuber(vtuber);
    setNameOnVtuber(vtuber);
    return vtuber;
}

module.exports = {
    "getVtuberWiki" :  getVtuberWiki
}