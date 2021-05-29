const AnimalData = require('../../../model/animalData/animalData');

module.exports = async (req, res, next) => {
    try {
        let result = await AnimalData.find({});
        res.locals.animalData = result;
        return next();
    } catch(error) {
        return res.redirect('/errors/goneWrong');
    }
}