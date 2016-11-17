import _ from 'lodash';
import getVolumesCount from './getVolumesCount';
import log4js from 'log4js';
const logger = log4js.getLogger('handleVolumes');

export default function handleVolumes (req, res, pcData) {
	try {
		const volumes = getVolumesCount(pcData);
		return res.send(JSON.stringify(volumes));
	} catch (err) {
		logger.error('Fail', err);
		switch (err.message) {
			case 'Invalid username':
				res.send(err.message);
				break;
			default:
				res.sendStatus(500);
				break;
		}
	}
}