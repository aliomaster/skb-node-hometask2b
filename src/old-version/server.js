import express from 'express';
import cors from 'cors';
import queryLogger from './queryLogger';
import log4js from 'log4js';
const logger = log4js.getLogger('Server');

import sendPcData from './sendPcData';
import handleVolumes from './handleVolumes';


export default function server(pcData) {
	try {
		const app = express();
		const router = express.Router();

		router.use(queryLogger);
		router.get('/volumes', (req, res) => {
			handleVolumes(req, res, pcData);
		});

		// todo: add rechecking for length

		/*router.get('/board/vendor/length', (req, res) => {
			return res.sendStatus(404);
		});
		router.get('/hdd/length', (req, res) => {
			return res.sendStatus(404);
		});*/
		router.get('*', (req, res) => {
			logger.warn(getRouter());
			//sendPcData(req, res, pcData);
		});

		app.use(cors());
		app.use('/', router);
		app.listen(8085, () => {
			logger.info('Your app listening on port 8085!');
		});

		logger.trace('Start');
	} catch (err) {
		logger.error('Fail', err);
	}
}