import _ from 'lodash';
import log4js from 'log4js';
const logger = log4js.getLogger('sendPcData');

export default function sendPcData (req, res, pcData) {
	try {
		const props = _.compact(
			req.url
				.replace(/[^-\w\/]+/, '')
				.split('?')[0]
				.split('#')[0]
				.split('/')
		).join('.');

		logger.warn(props);
		const findedData = (props === '') ? pcData : _.get(pcData, props);
		if (_.isUndefined(findedData)) {
			return res.sendStatus(404);
		} else {
			return res.send(JSON.stringify(findedData));
		}
	} catch (err) {
		logger.error('Fail', err);
		res.sendStatus(500);
	}
}