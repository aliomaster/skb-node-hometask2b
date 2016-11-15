import express from 'express';
import cors from 'cors';
import queryLogger from './queryLogger';
import log4js from 'log4js';
const logger = log4js.getLogger('Server');

import sendPcData from './sendPcData';
import handleVolumes from './handleVolumes';


function server(data) {
	try {
		const app = express();
		const router = express.Router();

		router.use(queryLogger);
		router.get('/volumes', (req, res) => {
			handleVolumes('req, res, data');
		});
		router.get('*', (req, res) => {
			sendPcData('req, res, data');
		});

		app.use(cors());
		app.use('/', router);
		app.listen(8080, () => {
			console.log('Your app listening on port 8080!');
		});

		logger.trace('Started');
	} catch (err) {
		logger.error('Fail', err);
	}
}

module.exports = server;