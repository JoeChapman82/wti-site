const streamBuffers = require('stream-buffers');
const csv = require('csv-parser');

const Record = require('../model/record/record');
const uploadMap = require('../data/maps/uploadMap');
const AnimalData = require('../model/animalData/animalData');
const { gatherData } = require('../helpers/dashboardDataRunner');

module.exports = async (req, res, next) => {
	let animalData = await AnimalData.find({});
	console.log('Clear on upload ', process.env.CLEAR_ON_UPLOAD);
	const readStream = new streamBuffers.ReadableStreamBuffer({});
	let lineNumber = 1;
	var bulkOperations = [];
	let keys;
	let isValidData = true;
	readStream.put(req.file.buffer);
	readStream.stop();

	readStream
		.pipe(csv())
		.on('data', data => {
			const recordToUpdate = {};
			// first get all data from CSV
			Object.keys(data).forEach(originalKey => {
				const key = originalKey.toLowerCase();
				let value = data[originalKey].trim();
				// fix ’ character like in Russell’s viper
				value = value.split('’').join("'");
				// fix ‐ character like Yellow‐throated
				value = value.split('‐').join('-');
				// add it to the record if it is present in our upload map
				if (uploadMap[key] && uploadMap[key].skip !== true) {
					const map = uploadMap[key];
					// if method is present, then use that
					if (map.method && typeof map.method === 'function') {
						recordToUpdate[map.linkedField] = map.method(value);
					} else {
						recordToUpdate[map.linkedField] = value;
					}
				}
			});

			// if at this point, at-least caseNumber is not there
			// then data is not valid
			if (!recordToUpdate.caseNumber) {
				isValidData = false;
				return;
			}

			// Now normalize some common cases
			// > Normalize case specifics
			const caseSpecifics = recordToUpdate.caseNumber.split('/');
			recordToUpdate.zoneName = `${caseSpecifics[0]}/${caseSpecifics[1]}`;
			// > Date added
			recordToUpdate.dateAdded = new Date();
			// > Additional data
			const additionalData = animalData.find(
				x => x.identityName === recordToUpdate.identityName
			);
			if (typeof additionalData !== 'undefined') {
				recordToUpdate.scientificName = additionalData.scientificName;
				recordToUpdate.iucnCategory = additionalData.iucnCategory;
				recordToUpdate.class = additionalData.class;
				recordToUpdate.groupName = additionalData.groupName;
			} else {
				recordToUpdate.class = 'Unknown';
				recordToUpdate.groupName = 'Unknown';
			}
			// All done, now add to our bulkoperation
			const upsertDoc = {
				updateOne: {
					filter: { caseNumber: recordToUpdate.caseNumber },
					update: recordToUpdate,
					upsert: true,
				},
			};
			bulkOperations.push(upsertDoc);
		})
		.on('end', async () => {
			console.log('read stream closed');
			req.file = undefined;
			if (!isValidData) {
				res.locals.errors = { uploadFile: ['Invalid data in file'] };
				return next();
			}
			if (process.env.CLEAR_ON_UPLOAD === 'true') {
				await Record.deleteMany({});
			}
			Record.collection
				.bulkWrite(bulkOperations)
				.then(bulkWriteOpResult => {
					console.log(`${bulkWriteOpResult.upsertedCount} records upserted`);
					res.locals.fileReceived = {
						uploadFile: {
							msg: 'File received. Commencing upload process. This may take a few minutes.',
						},
					};
					return gatherData();
				})
				.then(() => {
					return next();
				})
				.catch(err => {
					console.log('BULK update error');
					console.log(JSON.stringify(err, null, 2));
					res.locals.errors = { fileUpload: { msg: 'Error uploading to db' } };
					return next();
				});
		})
		.on('error', error => {
			console.log(error);
			req.file = undefined;
			console.log('read stream errors');
			res.locals.errors = { uploadFile: { msg: 'Error uploading file' } };
			return next();
		});
};
