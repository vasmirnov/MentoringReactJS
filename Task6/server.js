/*require('babel-register')({
    presets: ['react', 'es2015']
});

require.extensions['.css'] = () => {
    return;
};

//require('css-modules-require-hook/preset');
*/
import express from 'express';
import handleRender from './src/index_ss';


const port = 8080;
const server = express();

server.use(express.static('built'));
server.get('/*', handleRender);

server.listen(port, () => {
    console.info(`Server started on ${port}`);
});

