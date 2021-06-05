const findRecords = require('../../model/record/read');
const redirects = require('../../controllers/redirects');
const { dashboardDataRunner } = require('../../helpers/dashboardDataRunner');

module.exports = async (req, res, next) => {
	const keys = [
		'recordCount',
		'animalsSaved',
		'uniqueSpecies',
		'recordsThisMonth',
	];
	const dashboardResults = {};
	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0);
	const thisMonthQuery = { dateAdded: { $gte: startOfMonth, $lte: now } };
	const calls = [
		findRecords.count({}),
		findRecords.count({ finalDisposition: 'Released' }),
		findRecords.distinct('identityName'),
		findRecords.count(thisMonthQuery),
	];
	try {
		const responses = await Promise.all(calls);
		responses.forEach((response, index) => {
			dashboardResults[keys[index]] = response;
		});
		const dashboardData = dashboardDataRunner();
		res.locals.dashboardResults = { ...dashboardData, ...dashboardResults };
		res.locals.lastUpdated = dashboardData.lastUpdated;
		res.locals.dashboardResultsJSON = JSON.stringify(
			res.locals.dashboardResults
		);
		return next();
	} catch (error) {
		console.log(error);
		return redirects.goneWrong(req, res);
	}
};

// module.exports = async (req, res, next) => {
//     const keys = ['recordCount', 'userCount', 'recordsThisMonth'];
//     const dashboardResults = {};
//     const monthCounts = {};
//     const classCounts = {};
//     const groupCounts = {};
//     const now = new Date();
//     const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0);
//     const pastTwelveMonths = getPastTwelveMonths(now.getMonth(), now.getFullYear());
//     const thisMonthQuery = {dateAdded: {$gte: startOfMonth, $lte: now}};
//     const pastYearQueries = pastTwelveMonths.map((x) => {
//         keys.push(x.name);
//         return findRecords.count({dateAdded: {$gte: x.start, $lte: x.end}});
//     });
//     const classes = await findRecords.distinct('class');
//     const groups = await findRecords.distinct('groupName');

//     let calls = [
//         findRecords.count({}),
//         findUsers.count({}),
//         findRecords.count(thisMonthQuery),
//         ...pastYearQueries,
//         ...classes.map((name) => {
//             keys.push(`class-${name}`);
//             return findRecords.count({class: name});

//         }),
//         ...groups.map((name) => {
//             keys.push(`group-${name}`);
//             return findRecords.count({groupName: name});
//         })
//     ];
//     Promise.all(calls)
//         .then((responses) => {
//             responses.forEach((response, index) => {
//                 if(keys[index].includes('monthCount')) {
//                     monthCounts[keys[index]] = {
//                         date: pastTwelveMonths.find((x) => x.name === keys[index]).date,
//                         count: response
//                     };
//                 } else if(keys[index].includes('class')) {
//                     classCounts[keys[index].split('-')[1]] = response;
//                 } else if(keys[index].includes('group')) {
//                     groupCounts[keys[index].split('-')[1]] = response;
//                 } else if(keys[index]) {
//                     dashboardResults[keys[index]] = response;
//                 }
//             });
//             res.locals.lastUpdated = new Date();
//             res.locals.dashboardResults = dashboardResults;
//             res.locals.dashboardResults.monthCounts = monthCounts;
//             res.locals.dashboardResults.classCounts = classCounts;
//             res.locals.dashboardResults.groupCounts = groupCounts;
//             res.locals.dashboardResultsJSON = JSON.stringify(res.locals.dashboardResults);
//             console.log(res.locals.dashboardResults);
//             return next();
//         })
//         .catch((error) => {
//             console.log(error);
//             return redirects.goneWrong(req, res);
//         });
// };
