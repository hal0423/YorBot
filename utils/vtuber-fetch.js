const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const endpointURL = "https://api.ihateani.me/v2/graphql";

const gqlSchemas = `query($cursor: String) {
	vtuber {
		channels(cursor: $cursor, platforms: [youtube], sort_by: "statistics.subscriberCount", sort_order: desc) {
			items {
				id
				en_name
				image
				group
			}
			pageInfo {
				nextCursor
				hasNextPage
			}
		}
	}
}`

const getChannels = async (cursor = "") => {
	return await fetch(endpointURL, {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		"body": JSON.stringify({
			"query": gqlSchemas,
			"variables": {"cursor": cursor}
		})
	}).then((res) => res.json());
}

const getAllChannelsAsync = async (cursor = "") => {
	let results = await getChannels(cursor);
	// console.log(results);
	let gqlres = results.data.vtuber;
	let mainResults = gqlres.channels.items;
	let pageData = gqlres.channels.pageInfo;
	if (pageData.hasNextPage && pageData.nextCursor) return mainResults.concat(await getAllChannelsAsync(pageData.nextCursor));
	else return mainResults;
}

module.exports = { "getAllChannelsAsync": getAllChannelsAsync }
