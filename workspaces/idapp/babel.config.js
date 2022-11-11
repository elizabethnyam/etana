const path = require('path')

module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            src: path.resolve(__dirname, 'src')
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  }
}
