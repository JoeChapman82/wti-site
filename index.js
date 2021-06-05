require('dotenv').config();
const fs = require('fs');
const createDummyData = require('./app/data/createDummyData');
const path = require('path');
const https = require('https');
const express = require('express');
const initDb = require('./app/model/init');
const createMasterData = require('./app/data/master/createMasterData');
const createInitialUser = require('./app/model/createInitialUser');
const bootstrap = require('./app/middleware/bootstrap');
const AWS = require('aws-sdk');
const PORT = process.env.PORT;
const app = express();

const options = {
	key: fs.readFileSync(path.join(__dirname, process.env.KEY_FILE_PATH)),
	cert: fs.readFileSync(path.join(__dirname, process.env.CERT_FILE_PATH)),
};

AWS.config.update({ region: process.env.AWS_REGION });

bootstrap(app);
initDb();
createInitialUser();
createMasterData();

const server = https.createServer(options, app);

server.listen(PORT, () =>
	console.log(`WTI Frontend listening on port ${PORT}`)
);

if (process.env.CREATE_DUMMY_DATA === 'true') {
	createDummyData();
}
