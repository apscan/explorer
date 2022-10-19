const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const path = require('path');

module.exports = {
  babel: {
    presets: [
      [
        "@babel/preset-react",
        { runtime: "automatic", importSource: "@emotion/react" },
      ],
    ],
    plugins: ["@emotion/babel-plugin", '@vanilla-extract/babel-plugin'],
  },
  webpack: {
    plugins: [new VanillaExtractPlugin()],
    configure: (webpackConfig) => {
      const plugins = webpackConfig.resolve.plugins
      // find moduleScopePlugin
      const moduleScopePlugin = plugins.find((plugin) => plugin.allowedPaths)

      if (moduleScopePlugin) {
        const extractedPath = path.resolve(require.resolve('@vanilla-extract/webpack-plugin'), '../../extracted.js')

        moduleScopePlugin.allowedPaths.push(extractedPath)
      }


      return webpackConfig
    },
  },
};


