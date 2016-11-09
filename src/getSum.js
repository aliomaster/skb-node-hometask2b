export default function getSum(query) {
	const a = ( +query.a ) ? +query.a : 0;
	const b = ( +query.b ) ? +query.b : 0;
	return String(a + b);
}