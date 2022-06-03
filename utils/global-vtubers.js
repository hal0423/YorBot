const vtuberFetch = require("./vtuber-fetch.js");
let vtubers = [];
module.exports = {
    "init": async () => {
        vtubers = await vtuberFetch.getAllChannelsAsync();
    },
    "getVtuber": (name) => {
        return vtubers.find(_vtuber => _vtuber.en_name === name);
    }
}