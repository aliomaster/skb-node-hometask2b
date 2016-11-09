import _ from 'lodash';

export default function getCorrectName(query) {
	const fullname = ( query.fullname ) ? query.fullname : false;
	const reg = /^(?:\s+)?([А-Яа-яЁёó\w-\'.]*)(?: +)?([А-Яа-яЁёó\w-\'.]*)(?: +)?([А-Яа-яЁёó\w-\'.]*)?/;
	const regExclude = /[\d_\/]+/;
	if (fullname && !fullname.match(regExclude)) {
		const nm = fullname.match(reg);

		const count = _.compact(_.split(nm['input'], / +/g)).length;

		if (count == 1) {
			return `${_.upperFirst(_.lowerCase(nm[1]))}`;
		} else if (count == 2) {
			return `${_.upperFirst(nm[2])} ${_.upperCase(nm[1].slice(0,1))}.`;
		} else if (count == 3) {
			return `${_.upperFirst(_.lowerCase(nm[3]))} ${_.upperCase(nm[1].slice(0,1))}. ${_.upperCase(nm[2].slice(0,1))}.`;
		} else {
			return 'Invalid fullname';
		}
	} else {
		return 'Invalid fullname';
	}
}