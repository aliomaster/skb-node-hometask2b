export default function getCorrectName(query) {
	const username = ( query.username ) ? query.username : false;
	const reg = /^(?:https?\:)?(?:(?:[\/]{1,2})?(?:@)?([А-Яа-я\w\.-]+\/)?)(?:@)?([\w\.-]+)(?:\?(?:[\&\w\d=-]*))?(?:\/[\w-\/.]*)?/;
	const matches = username.match(reg);
	if (matches[2]) {
		console.log(matches);
		return `@${matches[2]}`;
	} else {
		return 'Invalid username';
	}
}