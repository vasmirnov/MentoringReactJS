const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    context: path.join(__dirname, 'src'),

    entry: './App',

    output: {
        path: path.join(__dirname, "built"),
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: ["transform-react-jsx"],
                    presets: ['env']
                }
            }
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Netflix Roulette Search',
            hash: true,
            template: './index.html'
        }),
    ],
};