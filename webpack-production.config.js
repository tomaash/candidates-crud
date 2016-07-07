var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: {
    app: [
      'bootstrap-loader/extractStyles',
      path.join(__dirname, '/src/app/app.tsx')
    ],
    vendor: ['react', 'react-dom', 'mobx', 'mobx-react', 'react-bootstrap', 'core-decorators']
  },
  resolve: {
    //When require, do not have to add these extensions to file's name
    extensions: ['', '.js', '.ts', '.tsx', '.json']
    //node_modules: ["web_modules", "node_modules"]  (Default Settings)
  },
  //Render source-map file for final build
  devtool: 'source-map',
  //output config
  output: {
    path: buildPath,    //Path of output file
    filename: 'app-[chunkhash].js'  //Name of output file
  },
  context: path.join(__dirname),
  plugins: [
    // So that React minifies itself
    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify("production")
       }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle-[hash].js' }),
    //Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),
    // Extract CSS for prod
    new ExtractTextPlugin('app-[chunkhash].css', { allChunks: true }),
    //Allows error warnings but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
    // Generate initial HTML
    new HtmlWebpackPlugin({
      title: 'Web Widget',
      template: 'src/templates/index.ejs'
    })

  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "src/app")],
        exclude: [nodeModulesPath]
      },
    ],
    loaders: [
      {
        test: /\.tsx?$/,  //All .ts and .tsx files
        loaders: ['awesome-typescript-loader'], //react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath]
      },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      },
      { test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      }
    ]
  },
  //Eslint config
  // eslint: {
  //   configFile: '.eslintrc' //Rules for eslint
  // },
  postcss: [ autoprefixer ]
};

module.exports = config;
