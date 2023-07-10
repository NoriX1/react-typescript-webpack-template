const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { outputConfig, copyPluginPatterns, entryConfig, devServer } = require('./env.config');

module.exports = (env, options) => {
  return {
    mode: options.mode,
    entry: entryConfig,
    devServer,
    // Dev only
    // Target must be set to web for hmr to work with .browserlist
    // https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019
    target: 'web',
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(scss|css)$/,
          use: [
            // We're in dev and want HMR, SCSS is handled in JS
            // In production, we want our css as files
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['postcss-preset-env']],
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                svgoConfig: {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                  ],
                },
              },
            },
            'file-loader',
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'javascript/auto',
          loader: 'file-loader',
          options: {
            publicPath: '../',
            name: '[path][name].[ext]',
            context: path.resolve(__dirname, 'src/assets'),
            emitFile: false,
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'javascript/auto',
          exclude: /images/,
          loader: 'file-loader',
          options: {
            publicPath: '../',
            context: path.resolve(__dirname, 'src/assets'),
            name: '[path][name].[ext]',
            emitFile: false,
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@src': path.resolve(__dirname, 'src'),
      },
    },
    output: {
      filename: 'js/[name].bundle.js',
      path: path.resolve(__dirname, outputConfig.destPath),
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: true,
        minify: false,
      }),
      new CopyPlugin(copyPluginPatterns),
    ],
  };
};
