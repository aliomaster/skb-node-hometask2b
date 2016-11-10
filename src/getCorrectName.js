import _ from 'lodash';
import getTitleCase from './getTitleCase';

export default function getCorrectName(query) {
	const fullname = ( query.fullname ) ? query.fullname : false;
	const reg = /^(?:\s+)?([А-Яа-яÀ-ÿЁё\w-\'.]*)(?: +)?([А-Яа-яÀ-ÿЁё\w-\'.]*)(?: +)?([А-Яа-яÀ-ÿЁё\w-\'.]*)?/;
	const regExclude = /[\d_\/]+/;

	if (fullname && !fullname.match(regExclude)) {
		const nm = fullname.match(reg);

		const count = _.compact(_.split(nm['input'], / +/g)).length;

		if (count == 1) {
			return getTitleCase(`${nm[1]}`);
		} else if (count == 2) {
			return getTitleCase(`${nm[2]} ${nm[1].slice(0,1)}.`);
		} else if (count == 3) {
			return getTitleCase(`${nm[3]} ${nm[1].slice(0,1)}. ${nm[2].slice(0,1)}.`);
		} else {
			return 'Invalid fullname';
		}
	} else {
		return 'Invalid fullname';
	}
}