const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const domain = require('./domain');
const environmental = domain.environmental;
module.exports = merge(common, {
    mode:'development',
    devtool: 'inline-source-map',
    output: {
        filename: 'js/[name].[hash].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        port:3000,
        historyApiFallback:true,
        hot:true,
        // host: "192.168.20.153",
        proxy:{
            '/api/*': {
                target: domain[environmental].api,
                changeOrigin: true,
                pathRewrite: {'^/api' : ''}
            },
            '/auth/*': {
                target: domain[environmental].auth,
                changeOrigin: true,
                pathRewrite: {'^/auth' : ''},

            },
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
