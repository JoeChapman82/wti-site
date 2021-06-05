const csv = require('csvtojson');
const avesFilePath = `${__dirname}/aves.csv`;
const mammalsFilePath = `${__dirname}/mammals.csv`;
const reptilesFilePath = `${__dirname}/reptiles.csv`;

const { v4 } = require('uuid');
const AnimalData = require('../../model/animalData/animalData');

module.exports = async () => {
	console.log('Deleting current DB Master data');
	const deletionResult = await AnimalData.deleteMany({});
	console.log(deletionResult);
	// aves
	let bulkOperations = [];
	console.log('Populating DB master data - Aves');
	const aves = await csv().fromFile(avesFilePath);
	const masterAves = aves.map(item => {
		return {
			id: v4(),
			class: 'aves',
			groupName: item.Family,
			identityName: item['English Name'],
			scientificName: item['Scientific Name'],
			iucnCategory: item['IUCN Category'],
		};
	});
	masterAves.forEach(ave => {
		bulkOperations.push({
			updateOne: {
				filter: { id: ave.id },
				update: ave,
				upsert: true,
			},
		});
	});
	try {
		const result = await AnimalData.collection.bulkWrite(bulkOperations);
		console.log(`${result.upsertedCount} entries made.`);
	} catch (error) {
		console.log('Error populating master data in DB');
		console.log(error);
	}
	// mamals
	bulkOperations = [];
	console.log('Populating DB master data - mammals');
	const mammals = await csv().fromFile(mammalsFilePath);
	const masterMammals = mammals.map(item => {
		return {
			id: v4(),
			class: 'mammals',
			groupName: item.Family,
			identityName: item['English Name'],
			scientificName: item['Scientific Name'],
			iucnCategory: item['IUCN Category'],
		};
	});
	masterMammals.forEach(mammal => {
		bulkOperations.push({
			updateOne: {
				filter: { id: mammal.id },
				update: mammal,
				upsert: true,
			},
		});
	});
	try {
		const result = await AnimalData.collection.bulkWrite(bulkOperations);
		console.log(`${result.upsertedCount} entries made.`);
	} catch (error) {
		console.log('Error populating master data in DB');
		console.log(error);
	}
	// reptiles
	bulkOperations = [];
	console.log('Populating DB master data - Reptiles');
	const reptiles = await csv().fromFile(reptilesFilePath);
	const masterReptiles = reptiles.map(item => {
		return {
			id: v4(),
			class: 'reptiles',
			groupName: item.Family,
			identityName: item['English Name'],
			scientificName: item['Scientific Name'],
			iucnCategory: item['IUCN Category'],
		};
	});
	masterReptiles.forEach(reptile => {
		bulkOperations.push({
			updateOne: {
				filter: { id: reptile.id },
				update: reptile,
				upsert: true,
			},
		});
	});
	try {
		const result = await AnimalData.collection.bulkWrite(bulkOperations);
		console.log(`${result.upsertedCount} entries made.`);
	} catch (error) {
		console.log('Error populating master data in DB');
		console.log(error);
	}
};
