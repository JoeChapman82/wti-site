const acceptedNames = ['aves.csv', 'mammals.csv', 'reptiles.csv'];
const streamBuffers = require('stream-buffers');
const csv = require('csv-parser');
const { v4 } = require('uuid');
const AnimalData = require('../model/animalData/animalData');

module.exports = async (req, res, next) => {
    if(!acceptedNames.includes(req.file.originalname)) {
        res.locals.errors = { uploadFile: ['only upload appropriately named files'] };
        return renders.updateAnimalData(req, res);
    }
    const className = req.file.originalname.split('.')[0];
    const animals = [];
    const bulkOperations = [];
    const readStream = new streamBuffers.ReadableStreamBuffer({});
    readStream.put(req.file.buffer);
    readStream.stop();
    
    readStream
        .pipe(csv())
        .on('data', data => {
            animals.push({
                id: v4(),
                class: className,
                groupName: data.Family,
                categoryName: data.Group,
                identityName: data['English Name'],
                scientificName: data['Scientific Name'],
                iucnCategory: data['IUCN Category']
            });
        })
        .on('end', async () => {
            console.log('Deleting current DB Master data');
            const deletionResult = await AnimalData.deleteMany({class: className});
            console.log(deletionResult);

            console.log('Adding new data');
            animals.forEach((animal) => {
                bulkOperations.push({
                    updateOne: {
                        filter: { id: animal.id },
                        update: animal,
                        upsert: true
                    }
                });
            });
            try {
                const result = await AnimalData.collection.bulkWrite(bulkOperations);
                console.log(`${result.upsertedCount} entries made.`);
            } catch (error) {
                console.log('Error populating master data in DB');
                console.log(error);
            }
            console.log('All done');
            return next();
        })
        .on('error', (error) => {
            console.log('An error occured');
            console.log(error);
            return redirects.goneWrong(req, res);

        });
    // console.log('Deleting current DB Master data');
    // const deletionResult = await AnimalData.deleteMany({});
    // console.log(deletionResult);
    // // aves
    // let bulkOperations = [];
    // console.log('Populating DB master data - Aves');
    // const aves = await csv().fromFile(avesFilePath);
    // const masterAves = aves.map(item => {
    //     return {
    //         id: v4(),
    //         class: 'aves',
    //         groupName: item.Family,
    //         categoryName: item.Group,
    //         identityName: item['English Name'],
    //         scientificName: item['Scientific Name'],
    //         iucnCategory: item['IUCN Category']
    //     };
    // });
    // masterAves.forEach(ave => {
    //     bulkOperations.push({
    //         updateOne: {
    //             filter: { id: ave.id },
    //             update: ave,
    //             upsert: true
    //         }
    //     });
    // });
    // try {
    //     const result = await AnimalData.collection.bulkWrite(bulkOperations);
    //     console.log(`${result.upsertedCount} entries made.`);
    // } catch (error) {
    //     console.log('Error populating master data in DB');
    //     console.log(error);
    // }
    // // mamals
    // bulkOperations = [];
    // console.log('Populating DB master data - mammals');
    // const mammals = await csv().fromFile(mammalsFilePath);
    // const masterMammals = mammals.map(item => {
    //     return {
    //         id: v4(),
    //         class: 'mammals',
    //         groupName: item.Family,
    //         categoryName: item.Group,
    //         identityName: item['English Name'],
    //         scientificName: item['Scientific Name'],
    //         iucnCategory: item['IUCN Category']
    //     };
    // });
    // masterMammals.forEach(mammal => {
    //     bulkOperations.push({
    //         updateOne: {
    //             filter: { id: mammal.id },
    //             update: mammal,
    //             upsert: true
    //         }
    //     });
    // });
    // try {
    //     const result = await AnimalData.collection.bulkWrite(bulkOperations);
    //     console.log(`${result.upsertedCount} entries made.`);
    // } catch (error) {
    //     console.log('Error populating master data in DB');
    //     console.log(error);
    // }
    // // reptiles
    // bulkOperations = [];
    // console.log('Populating DB master data - Reptiles');
    // const reptiles = await csv().fromFile(reptilesFilePath);
    // const masterReptiles = reptiles.map(item => {
    //     return {
    //         id: v4(),
    //         class: 'reptiles',
    //         groupName: item.Family,
    //         categoryName: item.Group,
    //         identityName: item['English Name'],
    //         scientificName: item['Scientific Name'],
    //         iucnCategory: item['IUCN Category']
    //     };
    // });
    // masterReptiles.forEach(reptile => {
    //     bulkOperations.push({
    //         updateOne: {
    //             filter: { id: reptile.id },
    //             update: reptile,
    //             upsert: true
    //         }
    //     });
    // });
    // try {
    //     const result = await AnimalData.collection.bulkWrite(bulkOperations);
    //     console.log(`${result.upsertedCount} entries made.`);
    // } catch (error) {
    //     console.log('Error populating master data in DB');
    //     console.log(error);
    // }
};
