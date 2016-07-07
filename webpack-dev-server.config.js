var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var config = {
  //Entry points to the project
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    'bootstrap-loader',
    path.join(__dirname, '/src/app/app.tsx')
  ],
  //Config options on how to interpret requires imports
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx', '.json']
    //node_modules: ["web_modules", "node_modules"]  (Default Settings)
  },
  //Server Configuration options
  devServer:{
    contentBase: 'src/templates',  //Relative directory for base of server
    devtool: 'source-map',
    hot: true,        //Live-reload
    inline: true,
    port: 3001,        //Port Number
    host: 'localhost'  //Change to '0.0.0.0' for external facing server
  },
  devtool: 'source-map',
  output: {
    path: buildPath,    //Path of output file
    filename: 'bundle-[hash].js',
  },
  plugins: [
    new ForkCheckerPlugin(),
    //Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    //Allows error warnings but does not stop compiling. Will remove when eslint is added
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle-[hash].js' }),
    new webpack.NoErrorsPlugin(),
    // Generate initial HTML
    new HtmlWebpackPlugin({
      title: 'Widget Works',
      template: 'src/templates/index.ejs'
    })
  ],
  module: {
    //Loaders to interpret non-vanilla javascript code as well as most other extensions including images and text.
    // preLoaders: [
    //   {
    //     //Eslint loader
    //     test: /\.(js|jsx)$/,
    //     loader: 'eslint-loader',
    //     include: [path.resolve(__dirname, "src/app")],
    //     exclude: [nodeModulesPath]
    //   },
    // ],
    loaders: [
      {
        //React-hot loader and
        test: /\.tsx?$/,  //All .ts and .tsx files
        loaders: ['react-hot', 'awesome-typescript-loader'], //react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath]
      },
      { test: /\.css$/, loaders: [ 'style', 'css', 'postcss' ] },
      { test: /\.scss$/, loaders: [ 'style', 'css', 'postcss', 'sass' ] },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      },
    ]
  },
  //eslint config options. Part of the eslint-loader package
  // eslint: {
  //   configFile: '.eslintrc'
  // },
  postcss: [ autoprefixer ]
};

module.exports = config;
