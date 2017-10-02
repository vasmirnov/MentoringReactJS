var app = require('express')();
var webpack = require('webpack');

var compiler = webpack(require('./webpack.config'));
var webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    noInfo: false,
    quiet: false,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 500
    },
    stats: {
        color: true,
        hash: true,
        version: false, // add webpack version information
        timings: true, // add timing information
        assets: false, // add assets information
        chunks: true, // add chunk information
        chunkModules: false, // add built modules information to chunk information
        modules: false, // add built modules information
        children: true, // add children information
        cached: true, // add also information about cached (not built) modules
        reasons: false, // add information about the reasons why modules are included
        source: false, // add the source code of modules
        errorDetails: true, // add details to errors (like resolving log)
        chunkOrigins: false // add the origins of chunks and chunk merging info

    }
});

app.use(webpackDevMiddleware);

app.listen(8080);
