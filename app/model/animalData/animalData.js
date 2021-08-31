const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalDataSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    class: {
        type: String,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    groupName: {
        type: String,
        required: true
    },
    identityName: {
        type: String,
        required: true
    },
    scientificName: {
        type: String,
        required: true
    },
    iucnCategory: {
        type: String,
        required: true
    }
});

const AnimalData = mongoose.model('animalData', AnimalDataSchema);
module.exports = AnimalData;
