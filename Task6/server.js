import express from 'express';
import handleRender from './src/index_ss';

var webpack = require('webpack');

var compiler = webpack(require('./webpack.config'));


const port = 8080;
const server = express();

server.use(express.static('built'));
server.get('/*', handleRender);

server.listen(port, () => {
    console.info(`Server started on ${port}`);
});

