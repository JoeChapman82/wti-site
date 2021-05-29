const AnimalData = require('../../../model/animalData/animalData');

module.exports = async (req, res, next) => {
    try {
        let result = await AnimalData.findOne({identityName: req.body.value});
        return res.status(200).json(result);
    } catch(error) {
        return res.redirect('/errors/goneWrong');
    }
}