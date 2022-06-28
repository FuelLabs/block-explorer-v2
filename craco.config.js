/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const packageJson = require('./package.json');

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
      plugins,
    },
    babel: {
      plugins: ['relay'],
    },
  };
};
