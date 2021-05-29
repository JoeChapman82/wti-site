const uuidV4 = require('uuid/v4');
const fs = require('fs');
let data = '';
function randomDate() {
    return new Date(new Date(2010, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2010, 0, 1).getTime()));
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max = Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

const fields = {
    'caseNumber' : () => uuidV4(),
    'groupName': ['Tiger', 'Deer', 'Elephant', 'Owl', 'Eagle', 'Reptile', 'Turtle', 'Monkey'],
    'identityName': ['Tiger', 'Deer', 'Elephant', 'Owl', 'Eagle', 'Reptile', 'Turtle', 'Monkey'],
    'class': ['Mamalia', 'Reptilia', 'Aves'],
    'placeOfRescue': ['Delhi', 'Bombay', 'Chenai', 'Hydrabad', 'Pune', 'Bengal'],
    'zoneName': ['MVS-CA', 'MVS-EA', 'MVS-NB'],
    'zoneName2': ['MVS-CA', 'MVS-EA', 'MVS-NB'],
    'dateAdded': () => randomDate(),
    'rescueNotes': 'None',
    'facility': 'Unknown',
    'dateOfAdmission': () => {
        let date = randomDate();
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}}`
    },
    'timeOfAdmission': () => {
        let date = randomDate();
        return `${date.getHours().toString().padStart(2, '0')}:${(date.getMinutes()).toString().padStart(2, '0')}}`
    },
    'food': 'None',
    'housing': null,
    'medicalCare': null,
    'proposedResolution': null,
    'otherResolution': null,
    'ageYears': () => randomNumber(1, 15),
    'ageMonths': () => randomNumber(1, 11),
    'stage': ['infant', 'neonate', 'subadult', 'adult'],
    'weight': () => `${randomNumber(20, 150)}kg`,
    length: () => `${randomNumber(20, 300)}cm`,
    'height': () => `${randomNumber(20, 150)}cm`,
    'dateOfExamination': () => randomDate(),
    'modeOfRestraint': 'None',
    'temperature': 'None',
    'heartRate': () => randomNumber(50, 150),
    'pulse': 'Yes',
    'resperation': 'None',
    'observationNotes': 'None',
    'outcomeNotes': 'None',
    'createdBy': null,
    'lastUpdatedAt': () => randomDate(),
    'lastUpdatedBy': null
};

module.exports = () => {
    for(let i = 0; i <= 1000; i++) {
        if(i === 1) {
            data += Object.keys(fields).join(',');
            data += '\n';
            continue;
        } else if(i === 0 || i === 2) {
            data += 'bob';
            data += '\n';
            continue;
        }
        Object.values(fields).forEach((value) => {
            if(typeof value === 'string') {
                data += `${value},`;
            } else if(Array.isArray(value)) {
                data += `${value[randomNumber(0, value.length - 1)]},`;
            } else if(typeof value === 'function') {
                data += `${value()},`
            } else {
                data += ',';
            }
        });
        data = data.slice(0, -1);
        data += '\n';
    }
    
    fs.writeFile(`${__dirname}/data.csv`, data, (err) => {
        if (err) {
            console.log(error);
        };
        console.log('Data creation complete!');
    });
}


