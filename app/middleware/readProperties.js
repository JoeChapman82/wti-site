const fs = require('fs');
const propertiesReader = require('properties-reader');
const path = require('path');
const propertiesFilePath = path.resolve(__dirname, '../../properties/version.properties');

module.exports = (req, res) => {
    fs.readFile(propertiesFilePath, (err, data) => {
        if(err) {
            res.status(500).json({error: {message: 'Unable to locate the .properties file'}});
        } else {
            const properties = propertiesReader(propertiesFilePath);
            res.json({
                data: {
                    version: properties.path().version,
                    build: properties.path().build,
                    timestamp: properties.path().timestamp,
                    gitCommit: properties.path().gitCommit,
                    nodeVersion: process.versions.node,
                    environment: process.env.NODE_ENV
                }
            });
        }
    });
};
