const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
        modules: ['./src', 'node_modules'] // Assuming that your files are inside the src dir
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],

};