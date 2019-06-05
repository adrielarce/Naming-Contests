import config from './config';
import apiRouter from './api';
//import sassMiddleWare from 'node-sass-middleware';
import path from 'path';
import serverRender from './serverRender';
import express from 'express';
import bodyParser from 'body-parser';
const server = express();
/*
server.use(sassMiddleWare({
	src: path.join(__dirname, 'css'),
	dest: path.join(__dirname, 'public')
}));
*/
server.set('view engine', 'ejs');
server.use(bodyParser.json());



server.get(['/', '/contest/:contestId'], (req, res) => {
	serverRender(req.params.contestId)
		.then(( {initialMarkup, initialData} ) => {
			res.render('index', { 
				initialMarkup,
				initialData
			});
		})
		.catch(error => {
			console.error(error);
			res.status(404).send('Bad Request');
		});	
});

server.use ('/api', apiRouter);
//static middleware. serves static assets (e.g. about.html) in 'public' directory
server.use(express.static('public'));


server.listen(config.port, config.host, () => {
	console.info('Express listening on port: ', config.port);
});


