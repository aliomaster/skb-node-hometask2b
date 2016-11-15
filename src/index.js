import express from 'express';
import fetch from 'isomorphic-fetch';
import server from './server';
import log4js from 'log4js';
import logger from log4js.getLogger('App');

const fileURL = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json'

logger.trace('Start');

/*fetch('/article/fetch/user.json')
	.then(function(response) {
		alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
		alert(response.status); // 200

		return response.json();
	 })
	.then(function(user) {
		alert(user.name); // iliakan
	})
	.catch( alert );*/

fetch(fileURL)
	.then(
		res => res.json()
	)
	.then(
		logger.trace('Got data', pcData)
		pcData => server(pcData)
	)
	.catch(
		err => logger.error('Fail, ', err)
	)