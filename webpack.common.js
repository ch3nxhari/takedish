/* eslint-disable max-len */
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[contenthash][ext]',
        },
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        use: {
          loader: 'responsive-loader',
          options: {
            adapter: require('responsive-loader/sharp'),
            outputPath: './assets/img',
            quality: 50,
            progressive: true,
          },
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
            },
          },
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 50,
          },
        },
      ],
      overrideExtension: true,
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
      favicon: path.resolve(__dirname, 'src/public/images/icons/favicon.ico'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      maximumFileSizeToCacheInBytes: 600000,
    }),
    new MiniCssExtractPlugin({filename: 'assets/css/[fullhash].css'}),
    new WebpackPwaManifest({
      name: 'TakeDish',
      short_name: 'TakeDish',
      description: 'Satisfy your cravings, anywhere, anytime',
      start_url: './index.html',
      background_color: '#FFFFFF',
      theme_color: '#058381',
      display: 'standalone',
      orientation: 'any',
      publicPath: './',
      filename: 'site.webmanifest',
      ios: true,
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/images/icons/logo.png'),
          size: 180,
          destination: 'assets/icons',
          ios: true,
        },
        {
          src: path.resolve(__dirname, 'src/public/images/icons/logo.png'),
          sizes: [72, 96, 128, 192, 256, 384, 512],
          destination: 'assets/icons',
          purpose: 'any',
        },
        {
          src: path.resolve(__dirname, 'src/public/images/icons/logo.png'),
          sizes: [72, 96, 128, 192, 256, 384, 512],
          destination: 'assets/icons',
          purpose: 'maskable',
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        minify: [
          CssMinimizerPlugin.cssnanoMinify,
          CssMinimizerPlugin.cssoMinify,
          CssMinimizerPlugin.cleanCssMinify,
        ],
        minimizerOptions: {
          preset: [
            'advanced',
          ],
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
