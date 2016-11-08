import express from 'express';
import cors from 'cors';
import _ from 'lodash';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
	res.json({
		hello: 'JS World',
	});
});

app.get('/task2B', (req, res) => {
	const fullname = ( req.query.fullname ) ? req.query.fullname : false;
	const reg = /^(?:\s+)?([А-Яа-яЁёó\w-\'.]*)(?: +)?([А-Яа-яЁёó\w-\'.]*)(?: +)?([А-Яа-яЁёó\w-\'.]*)?/;
	const regExclude = /[\d_\/]+/;
	if (fullname && !fullname.match(regExclude)) {
		const nm = fullname.match(reg);

		const count = _.compact(_.split(nm['input'], / +/g)).length;

		if (count == 1) {
			res.send(`${_.upperFirst(_.lowerCase(nm[1]))}`);
		} else if (count == 2) {
			res.send(`${_.upperFirst(nm[2])} ${_.upperCase(nm[1].slice(0,1))}.`);
		} else if (count == 3) {
			res.send(`${_.upperFirst(_.lowerCase(nm[3]))} ${_.upperCase(nm[1].slice(0,1))}. ${_.upperCase(nm[2].slice(0,1))}.`);
		} else {
			res.send('Invalid fullname');
		}
	} else {
		res.send('Invalid fullname');
	}
});

app.listen(8080, () => {
	console.log('Your app listening on port 8080!');
});