import express from 'express';
import fetch from 'isomorphic-fetch';
import server from './server';
import log4js from 'log4js';
const logger = log4js.getLogger('App');

const pcDataURL = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json'

logger.trace('Start');

fetch(pcDataURL)
	.then (
		res => res.json()
	)
	.then(pcData => {
			logger.trace('Got PC data', pcData);
			server(pcData);
		}
	)
	.catch(
		err => {
			logger.error('Fail, ', err);
		}
	)