const AnimalData = require('../../../model/animalData/animalData');
let linkedData = {
    class: "groupName",
    groupName: "identityName"
}

module.exports = async (req, res, next) => {
    try {
        let field = linkedData[req.body.key];
        let results = await AnimalData.find({[req.body.key]: req.body.value}, field);
        let sortedResults = results
        .sort((a, b) => a[field] < b[field] ? -1 : 1)
        .map((x) => x[field]);
        return res.status(200).json([...new Set(sortedResults)]);
    } catch(error) {
        return res.redirect('/errors/goneWrong');
    }
}