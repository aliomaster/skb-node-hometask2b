import _ from 'lodash';
import getVolumesCount from './getVolumesCount';

function handleVolumes (req, res, data) {
	try {
		const volumes = getVolumesCount(data);
		return res.send(JSON.stringify(volumes));
	} catch (err) {
		console.log('error from handle');
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