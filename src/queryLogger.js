import log4js from 'log4js';
const logger = log4js.getLogger('queryLogger');

export default function queryLogger (req, res, next) {
	logger.trace('%s %s', req.method, req.url);
	next();
}