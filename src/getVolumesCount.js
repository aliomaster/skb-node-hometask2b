import _ from 'lodash';

function getVolumesCount (data) {
	if (data && 'hdd' in data && Array.isArray(data.hdd)) {
		return _.reduce(
			data.hdd,
			(result, e) => {
				if (result[e.volume]) {
					result[e.volume] = String(parseInt(result[e.volume]) + parseInt(e.size)) + 'B';
				} else {
					result[e.volume] = String(e.size) + 'B';
				}
				return result;
			},
			{}
		)
	} else {
		return {}
	}
}

module.exports = getVolumesCount;