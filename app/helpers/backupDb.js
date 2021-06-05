const AWS = require('aws-sdk');
const { promisify } = require('util');
const bucket = process.env.AWS_BUCKET || 'bob';
const readRecords = require('../model/record/read');
const readUsers = require('../model/user/read');
let lastBackupTime = null;

module.exports = () => {
	return lastBackupTime;
};

backupDb();
setInterval(backupDb, 43200000);

async function backupDb() {
	if (process.env.RUN_BACKUP_PROCESS !== 'true') {
		return;
	}
	const recordKey = `backups/records/${new Date()}.json`;
	const userKey = `backups/users/${new Date()}.json`;
	try {
		const allUsers = await readUsers.dump();
		const allRecords = await readRecords.dump();
		console.log(
			`Backing up ${allUsers.length} users and ${allRecords.length} records.`
		);
		const userS3 = new AWS.S3();
		let params = {
			Body: JSON.stringify(allUsers),
			Bucket: bucket,
			Key: userKey,
		};
		const userData = await userS3.upload(params).promise();
		console.log('User backup complete:', userData);
		const recordS3 = new AWS.S3();
		params = {
			Body: JSON.stringify(allRecords),
			Bucket: bucket,
			Key: recordKey,
		};
		const recordData = await recordS3.upload(params).promise();
		console.log('Record backup complete:', recordData);
		lastBackupTime = new Date();
	} catch (error) {
		console.log(error);
	}
}
