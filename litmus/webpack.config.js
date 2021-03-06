const webpack = require('webpack'),
   ExtractTextPlugin = require("extract-text-webpack-plugin"),
   HtmlWebpackPlugin = require('html-webpack-plugin'),
   merge = require('webpack-merge'),
   path = require('path'),
   babelConfig = require('./babel.config');

var common = {

   resolve: {
      alias: {
         'cx': path.resolve(path.join(__dirname, '../packages/cx/src')),
         'cx-react': path.resolve(path.join(__dirname, '../packages/cx-react')),
         //'cx-react': path.resolve(path.join(__dirname, '../packages/cx-inferno')),
         litmus: __dirname
      }
   },

   module: {
      loaders: [{
         test: /\.json$/,
         loader: 'json-loader'
      }, {
         test: /\.js$/,
         include: /(litmus|cx)/,
         loader: 'babel-loader',
         query: babelConfig
      }]
   },
   entry: {
      vendor: [
         'babel-polyfill',
         'cx-react'
      ],
      app: __dirname + '/index.js'
   },
   output: {
      path: __dirname,
      filename: "[name].js"
   },
   externals: {
      "react": "React",
      "react-dom": "ReactDOM"
   },
   plugins: [
      new webpack.optimize.CommonsChunkPlugin("vendor"),
      new HtmlWebpackPlugin({
         template: path.join(__dirname, 'index.html')
      })
   ]
};

var specific;

switch(process.env.npm_lifecycle_event) {
   case 'build:litmus':
      var sass = new ExtractTextPlugin({
         filename: "app.css",
         allChunks: true
      });
      specific = {
         module: {
           loaders: [{
              test: /\.scss$/,
              loaders: sass.extract(['css-loader', 'sass-loader'])
           }, {
              test: /\.css$/,
              loaders: sass.extract(['css-loader'])
           }]
         },

         plugins: [
            //new webpack.optimize.UglifyJsPlugin(),
            new webpack.DefinePlugin({
               'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            sass
         ],

         output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '.'
         }
      };
      break;

   default:
      specific = {
         module: {
            loaders: [{
               test: /\.scss$/,
               loaders: ["style-loader", "css-loader", "sass-loader"]
            }, {
               test: /\.css$/,
               loader: ["style-loader", "css-loader"]
            }]
         },
         plugins: [
            new webpack.HotModuleReplacementPlugin()
         ],
         output: {
            publicPath: '/'
         },
         performance: {
            hints: false
         },
         devtool: 'eval',
         devServer: {
            contentBase: '/',
            hot: true,
            port: 8086,
            noInfo: false,
            inline: true,
            historyApiFallback: true
         }
      };
      break;
}

module.exports = merge(common, specific);
