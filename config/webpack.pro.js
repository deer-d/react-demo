const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode:'production',
    devtool:'inline-source-map',
    plugins:[
        new CleanWebpackPlugin(['./dist/*/'], {root:path.resolve(__dirname, '../')}),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments : { removeAll: true }},
            canPrint: true
        }),
        new UglifyWebpackPlugin()
    ]
});