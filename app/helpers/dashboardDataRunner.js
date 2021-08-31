const findRecords = require('../model/record/read');
const getPastTwelveMonths = require('./getPastTwelveMonths');
const { updateDashboardDataTimeMs } = require('../config/main');
let dashboardData = {};

async function gatherData() {
	console.log('Starting dashboard data gather', new Date());
	const keys = [];
	const dashboardResults = {};
	const monthCounts = {};
	const classCounts = {};
	const groupCounts = {};
	const zoneCounts = {};
	const now = new Date();
	const pastTwelveMonths = getPastTwelveMonths(
		now.getMonth(),
		now.getFullYear()
	);
	const pastYearQueries = pastTwelveMonths.map(x => {
		keys.push(x.name);
		return findRecords.count({ dateOfRescue: { $gte: x.start, $lte: x.end } });
	});
	const classes = await findRecords.distinct('class');
	const groups = await findRecords.distinct('groupName');
	const zones = await findRecords.distinct('zoneName');
	let calls = [
		...pastYearQueries,
		...classes.map(name => {
			keys.push(`class-${name}`);
			return findRecords.count({ class: name });
		}),
		...groups.map(name => {
			keys.push(`group-${name}`);
			return findRecords.count({ groupName: name });
		}),
		...zones.map(name => {
			keys.push(`zone-${name}`);
			return findRecords.count({ zoneName: name });
		}),
	];
	try {
		const responses = await Promise.all(calls);
		responses.forEach((response, index) => {
			if (keys[index].includes('monthCount')) {
				monthCounts[keys[index]] = {
					date: pastTwelveMonths.find(x => x.name === keys[index]).date,
					count: response,
				};
			} else if (keys[index].includes('class')) {
				classCounts[keys[index].split('-')[1]] = response;
			} else if (keys[index].includes('group')) {
				groupCounts[keys[index].split('-')[1]] = response;
			} else if (keys[index].includes('zone')) {
				zoneCounts[`${keys[index].split('-')[1]}`] = response;
			}
		});
		dashboardResults.monthCounts = monthCounts;
		dashboardResults.classCounts = classCounts;
		dashboardResults.groupCounts = groupCounts;
		dashboardResults.zoneCounts = zoneCounts;
		dashboardResults.lastUpdated = now;
		dashboardData = dashboardResults;
		console.log('Dashboard data gather complete', new Date());
		console.log(dashboardResults);
	} catch (error) {
		console.log('Error in dashboard data gatherer');
		console.log(error);
	}
}

gatherData();
setInterval(gatherData, updateDashboardDataTimeMs);

module.exports = {
	dashboardDataRunner: () => dashboardData,
	gatherData,
};
