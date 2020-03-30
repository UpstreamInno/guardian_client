module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            Screens: './screens',
            Store: './store',
            Components: './components',
            Lib: './lib',
          }
        }
      ]
    ],
  };
};
