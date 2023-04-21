// imports
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

let mode = 'development';
// usually target is defaulted to web but can also be node etc setting to web just incase
let target = 'web';

// webpack plugins
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    // my index html file is in the public folder
    template: path.join(__dirname, 'public', 'index.html'),
    // don't need this anymore but cool to know this option exists
    // favicon: 'public/Assets/favicon/favicon32x32.ico',
    // for production use
    minify: true,
  }),
  new EslintPlugin({ extensions: ['js', 'jsx'] }),
  new CompressionPlugin({
    algorithm: 'gzip',
  }),
];

//  if webpack is in production build
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  // not sure if the browserslist is actually
  // bugged still but if it ain't broke I will not change this
  target = 'browserslist';
}

// only want React Hot Reloading in serve mode
if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

// webpack code wrapped to be exported
module.exports = {
  // setting the mode to a variable that way I can switch between dev and production
  mode,

  // entry point of my app
  entry: './src/index.jsx',

  //   setting the ouput of the webpack
  output: {
    path: path.resolve(__dirname, './build'),
    // this places all images processed in an image folder
    assetModuleFilename: 'images/[hash][ext][query]',
  },

  //   all of the modules have rules and this is how to add said rules
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // This is required for asset imports in CSS, such as url()
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
          //   sass needs to be at the bottom to avoid any post css errors
          'sass-loader',
        ],
      },
      // looking for html
      {
        test: /index\.html$/i,
        loader: 'html-loader',
      },
      // this is for images
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/i,
        type: 'asset/resource',
        exclude: /node_modules/,
      },

      //   module rules for bable
      {
        // updated regex because the previous regex seemed  to not work
        test: /\.(js|jsx|ts|tsx)$/,
        // this is supposed to be regex
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // needs to be inside use
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins,

  target,

  //   possible js extensions
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devtool: 'source-map',

  devServer: {
    // contentbase is deprecated use static instead
    static: './build',
    hot: true,
    port: 3000, // default 8000
    // this should render a browser level overlay if there is a compiler error
    client: {
      overlay: true,
    },
  },
};
