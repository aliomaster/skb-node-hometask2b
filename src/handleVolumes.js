import _ from 'lodash';
import getVolumesCount from './getVolumesCount';
import log4js from 'log4js';
const logger = log4js.getLogger('handleVolumes');

function handleVolumes (req, res, data) {
	try {
		const volumes = getVolumesCount(data);
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

module.exports = handleVolumes;