module.exports = (req, res, next) => {
    let now = new Date();
    let keys = Object.keys(res.locals.reportData);
    let values = Object.values(res.locals.reportData);
    let csvString = `${keys.join(',')}\n${values.join(',')}`;
    res.attachment(`${req.body.reportType}-${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}.csv`);
    return res.status(200).send(csvString);
}