const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    caseNumber: {
        type: String,
        index: true,
        unique: true
    },
    groupName: {
        type: String,
        index: true
    },
    identityName: {
        type: String
    },
    categoryName: {
        type: String
    },
    class: {
        type: String
    },
    iucnCategory: {
        type: String
    },
    scientificName: {
        type: String
    },
    sex: {
        type: String
    },
    displacement: {
        type: String
    },
    rescueMode: {
        type: String
    },
    rescueType: {
        type: String
    },
    placeOfRescue: {
        type: String
    },
    gpsLatitudeRescue: {
        type: String
    },
    gpsLongditudeRescue: {
        type: String
    },
    gpsLatitudeRelease: {
        type: String
    },
    gpsLongditudeRelease: {
        type: String
    },
    zoneName: {
        type: String
    },
    zoneName2: {
        type: String
    },
    dateAdded: {
        type: Date
    },
    rescueNotes: {
        type: String
    },
    facility: {
        type: String
    },
    dateOfAdmission: {
        type: Date
    },
    dateOfDeath: {
        type: Date
    },
    clinicalSigns: {
        type: String
    },
    pmReport: {
        type: Buffer
    },
    pictureOnArrival: {
        type: Buffer
    },
    timeOfAdmission: {
        type: String
    },
    food: {
        type: String
    },
    housing: {
        type: String
    },
    reasonPendingUnderCare: {
        type: String
    },
    medicalCare: {
        type: String
    },
    proposedResolution: {
        type: String
    },
    otherResolution: {
        type: String
    },
    ageYears: {
        type: String
    },
    ageMonths: {
        type: String
    },
    stage: {
        type: String
    },
    weightKg: {
        type: String
    },
    weightG: {
        type: String
    },
    length: {
        type: String
    },
    lengthSnoutVent: {
        type: String
    },
    lengthTailShoulder: {
        type: String
    },
    height: {
        type: String
    },
    dateOfExamination: {
        type: Date
    },
    dateOfTranser: {
        type: Date
    },
    placeOfTransfer: {
        type: String
    },
    reasonTransfer: {
        type: String
    },
    dateOfEscape: {
        type: Date
    },
    placeOfEscape: {
        type: String
    },
    reasonEscape: {
        type: String
    },
    dateOfRelease: {
        type: Date
    },
    dateOfRescue: {
        type: Date
    },
    placeOfRelease: {
        type: String
    },
    marked: {
        type: String
    },
    markedType: {
        type: String
    },
    modeOfRestraint: {
        type: String
    },
    temperature: {
        type: String
    },
    heartRate: {
        type: String
    },
    pulse: {
        type: String
    },
    resperation: {
        type: String
    },
    observationNotes: {
        type: String
    },
    finalDisposition: {
        type: String
    },
    outcomeNotes: {
        type: String
    },
    remarks: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId
    },
    lastUpdatedAt: {
        type: Date
    },
    lastUpdatedBy: {
        type: Schema.Types.ObjectId
    }
});

const Record = mongoose.model('record', RecordSchema);
module.exports = Record;
