import _ from 'lodash';

function getVolumesCount (pcData) {
	if (pcData && 'hdd' in pcData && Array.isArray(pcData.hdd)) {
		return _.reduce(
			pcData.hdd,
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