const findRecords = require('../../../model/record/read');
const finalDispositionStates = require('../../../config/lists/finalDispositionStates');
const causesOfDisplacement = require('../../../config/lists/causesOfDisplacement');
const iucnStates = require('../../../config/lists/iucnStates');
const classes = ['aves', 'mammals', 'reptiles'];

module.exports = async (req, res, next) => {
	let queries = [];
	let queryNames = [];
	let reportData = {};
	if (req.body.reportType === 'time') {
		let start = new Date(req.body.startDate);
		let end = new Date(req.body.endDate);
		queries.push(
			findRecords.count({
				dateOfRescue: { $gte: start, $lte: end },
				class: 'mammals',
			})
		);
		queries.push(
			findRecords.count({
				dateOfRescue: { $gte: start, $lte: end },
				class: 'aves',
			})
		);
		queries.push(
			findRecords.count({
				dateOfRescue: { $gte: start, $lte: end },
				class: 'reptiles',
			})
		);
		queryNames.push('mammals', 'aves', 'reptiles');
	} else if (req.body.reportType === 'displacement') {
		causesOfDisplacement.forEach(cause => {
			queries.push(findRecords.count({ displacement: cause }));
		});
		queryNames.push(...causesOfDisplacement);
	} else if (req.body.reportType === 'species') {
		if (req.body.identityName) {
			queries.push(findRecords.count({ identityName: req.body.identityName }));
			finalDispositionStates.forEach(state => {
				queries.push(
					findRecords.count({
						identityName: req.body.identityName,
						finalDisposition: state,
					})
				);
			});
			queryNames.push('total', ...finalDispositionStates);
		} else if (req.body.groupName) {
			queries.push(findRecords.count({ groupName: req.body.groupName }));
			finalDispositionStates.forEach(state => {
				queries.push(
					findRecords.count({
						groupName: req.body.groupName,
						finalDisposition: state,
					})
				);
			});
			queryNames.push('total', ...finalDispositionStates);
		} else {
			queries.push(findRecords.count({ class: req.body.class }));
			finalDispositionStates.forEach(state => {
				queries.push(
					findRecords.count({ class: req.body.class, finalDisposition: state })
				);
			});
			queryNames.push('total', ...finalDispositionStates);
		}
	} else if (req.body.reportType === 'iucn') {
		classes.forEach(aClass => {
			iucnStates.forEach(state => {
				queries.push(findRecords.count({ class: aClass, iucnCategory: state }));
				queryNames.push(`${aClass}-${state}`);
			});
		});
	} else if (req.body.reportType === 'outcome') {
		finalDispositionStates.forEach(state => {
			queries.push(findRecords.count({ finalDisposition: state }));
		});
		queryNames.push(
			'deadOnArrival',
			'diedUnderCare',
			'Released',
			'Transferred',
			'Escaped'
		);
	}
	try {
		let results = await Promise.all(queries);
		results.forEach((result, index) => {
			reportData[queryNames[index]] = result;
		});
		res.locals.reportData = reportData;
		return next();
	} catch (error) {
		console.log(error);
		return res.redirect('/errors/goneWrong');
	}
};
