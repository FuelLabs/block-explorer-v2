/* eslint-disable no-param-reassign */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const packageJson = require('./package.json');

const protocol = packageJson.protocol;
const BASE_URL = path.join(process.env.REPOSITORY_NAME || '', protocol);

process.env.REACT_APP_REPOSITORY_NAME = process.env.REPOSITORY_NAME || '';
if (process.env.NODE_ENV === 'production') {
  process.env.PUBLIC_URL = BASE_URL;
}

const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');
const CopyPluginWebpack = require('copy-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// https://github.com/Cap32/html-webpack-banner-plugin/blob/3b5f3f1adf1240b1f744aaa78eabefae50fa53b7/index.js
class HtmlWebpackBannerPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    const banner = this.options.banner || undefined;

    compiler.hooks.compilation.tap('HtmlWebpackBannerPlugin', (compilation) => {
      const hooks = HtmlWebpackPlugin.getHooks(compilation);
      hooks.beforeEmit.tap('HtmlWebpackBannerPlugin', (htmlPluginData) => {
        htmlPluginData.html = `${htmlPluginData.html}${banner ? `<!--\n${banner}\n-->` : ''}`;
        return htmlPluginData;
      });
    });
  }
}

// https://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow&t=Fuel%20Labs
const banner = `
███████╗██╗   ██╗███████╗██╗         ██╗      █████╗ ██████╗ ███████╗
██╔════╝██║   ██║██╔════╝██║         ██║     ██╔══██╗██╔══██╗██╔════╝
█████╗  ██║   ██║█████╗  ██║         ██║     ███████║██████╔╝███████╗
██╔══╝  ██║   ██║██╔══╝  ██║         ██║     ██╔══██║██╔══██╗╚════██║
██║     ╚██████╔╝███████╗███████╗    ███████╗██║  ██║██████╔╝███████║
╚═╝      ╚═════╝ ╚══════╝╚══════╝    ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝
${packageJson.name} v${packageJson.version}
`;

module.exports = () => {
  const isProductionBuild = process.env.NODE_ENV === 'production';
  const analyze = process.env.REACT_APP_ANALYZE === 'true' || false;

  const plugins = [
    new HtmlWebpackBannerPlugin({
      banner,
    }),
    new CreateFileWebpack({
      // path to folder in which the file will be created
      path: `./build/${packageJson.protocol}`,
      // file name
      fileName: 'versions',
      // content of the file
      content: [
        `BE_VERSION="${packageJson.version}"`,
        `BE_PROTOCOL="${packageJson.protocol}"`,
      ].join('\n'),
    }),
    new CopyPluginWebpack({
      patterns: [
        {
          from: './public/404.html',
          to: '../',
          transform(content) {
            return content
              .toString()
              .replace('%REPOSITORY_NAME%', process.env.REPOSITORY_NAME || '')
              .replace('%PROTOCOL_NAME%', packageJson.defaultProtocol);
          },
        },
        {
          from: './public/protocol-versions.json',
          to: '../',
        },
      ],
    }),
  ];

  if (isProductionBuild && analyze) {
    plugins.push(
      new BundleStatsWebpackPlugin({
        compare: false,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      })
    );
  }

  return {
    webpack: {
      configure: (webpackConfig, { paths }) => {
        paths.appBuild = path.join(paths.appBuild, packageJson.protocol);
        webpackConfig.output.path = paths.appBuild;
        return webpackConfig;
      },
      plugins,
    },
  };
};
