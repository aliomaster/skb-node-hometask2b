import express from 'express';
import cors from 'cors';

import getCorrectName from './getCorrectName';
import getSum from './getSum';
import getLogin from './getLogin';
import getColor from './getColor';
import getBlackBox from './getBlackBox';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
	res.json({
		hello: 'JS World',
	});
});

app.get('/task2A', (req, res) => {
	res.send(getSum(req.query));
});

app.get('/task2B', (req, res) => {
	res.send(getCorrectName(req.query));
})

app.get('/task2C', (req, res) => {
	res.send(getLogin(req.query));
})

app.get('/task2D', function (req, res) {
	res.send(getColor(req.query));
});

app.get('/task2X', function (req, res) {
	res.send(getBlackBox(req.query));
});

app.listen(8081, () => {
	console.log('Your app listening on port 8081!');
});