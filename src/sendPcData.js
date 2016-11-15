import _ from 'lodash';

function sendPcData (req, res, data) {
	try {
		const props = _.compact(
			req.url
				.replace(/[^-\w\/]+/, '')
				.split('?')[0]
				.split('#')[0]
				.split('/')
		).join('.');
		const findedData = props === ''
			? data
			: _.get(data, props)
		
		if (_.isUndefined(findedData)) {
			return res.sendStatus(404);
		} else {
			return res.send(JSON.stringify(findedData));
		}
	} catch (err) {
		console.log('error');
		res.sendStatus(500);
	}
}

module.exports = sendPcData;