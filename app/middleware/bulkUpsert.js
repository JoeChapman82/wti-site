const streamBuffers = require('stream-buffers');
const readline = require('readline');
const Record = require('../model/record/record');
const uploadMap = require('../data/maps/uploadMap');
const AnimalData = require('../model/animalData/animalData');

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

    const rl = readline.createInterface({
        input: readStream
    });

    rl.on('line', (line) => {
        if(lineNumber > 3) {
            let recordToUpdate = {};
            let values = line.split(',');
            let isAcceptableLine = values.some((x) => x.trim().length !== 0);
            if(values.length > 2 && isAcceptableLine) {
                for(let i = 0; i < values.length; i++) {
                    values[i] = values[i].trim();
                    if(uploadMap[keys[i]] && typeof uploadMap[keys[i]].method === 'function') {
                        let createdFields = uploadMap[keys[i]].method(values[i]);
                        if(createdFields) {
                            Object.entries(createdFields).forEach(([k, v]) => {
                                recordToUpdate[k] = v;
                            })
                        }
                    } else if(uploadMap[keys[i]]) {
                        if(uploadMap[keys[i]].linkedField === "remarks" && values[i][0] === '"') {
                            recordToUpdate[uploadMap[keys[i]].linkedField] = values[i].substring(1);
                        } else if(!uploadMap[keys[i].skip]) {
                            recordToUpdate[uploadMap[keys[i]].linkedField] = values[i];
                        }
                    }
                }
                let caseSpecifics = recordToUpdate.caseNumber.split('/');
                recordToUpdate.zoneName = `${caseSpecifics[0]}/${caseSpecifics[1]}`;
                recordToUpdate.dateAdded = new Date();
                let additionalData = animalData.find((x) => x.identityName === recordToUpdate.identityName);
                if(typeof additionalData !== 'undefined') {
                    recordToUpdate.scientificName = additionalData.scientificName;
                    recordToUpdate.iucnCategory = additionalData.iucnCategory;
                    recordToUpdate.class = additionalData.class;
                    recordToUpdate.groupName = additionalData.groupName;
                } else {
                    recordToUpdate.class = 'Unknown';
                    recordToUpdate.groupName = 'Unknown';
                }
                let upsertDoc = {
                    'updateOne': {
                        'filter': {caseNumber: recordToUpdate.caseNumber},
                        'update': recordToUpdate,
                        'upsert': true
                    }};
                bulkOperations.push(upsertDoc);
            }
        } else if(lineNumber === 2) {
            keys = line.split(',');
        } else if(lineNumber === 3) {
            let additionalKeyInfo = line.split(',');
            for(let i = 0; i < additionalKeyInfo.length; i++) {
                if(additionalKeyInfo[i].trim().length > 0) {
                    if(additionalKeyInfo[i].trim() === "Lat") {
                        keys[i] = `${keys[i]} ${additionalKeyInfo[i]}`;
                    } else if(additionalKeyInfo[i].trim() === "Long") {
                        keys[i] = `${keys[i - 1].substring(0, keys[i - 1].length - 4)} ${additionalKeyInfo[i]}`;
                    }
                }
            }
            keys = keys.filter((x) => x.trim().length > 0);
        } else {
            console.log('Unexpected line', lineNumber);
        }
        lineNumber++;
    });

    rl.on('close', async () => {
        console.log('read stream closed');
        req.file = undefined;
        if(!isValidData) {
            res.locals.errors = {uploadFile: ['Invalid data in file']};
            return next();
        }
        if(process.env.CLEAR_ON_UPLOAD === 'true') {
            await Record.deleteMany({});
        }
        Record.collection.bulkWrite(bulkOperations)
            .then(bulkWriteOpResult => {
                console.log(`${bulkWriteOpResult.upsertedCount} records upserted`);
                res.locals.fileReceived = {uploadFile: {msg: 'File received. Commencing upload process. This may take a few minutes.'}};
                return next();
            })
            .catch(err => {
                console.log('BULK update error');
                console.log(JSON.stringify(err, null, 2));
                res.locals.errors = {fileUpload: {msg: 'Error uploading to db'}};
                return next();
            });
    });

    rl.on('error', (error) => {
        console.log(error);
        req.file = undefined;
        console.log('read stream errors');
        res.locals.errors = {uploadFile: {msg: 'Error uploading file'}};
        return next();
    });


};
