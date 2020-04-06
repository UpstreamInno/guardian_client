const createExpoWebpackConfigAsync = require('@expo/webpack-config');

// https://www.npmjs.com/package/@expo/webpack-config
// https://docs.expo.io/versions/latest/guides/customizing-webpack/
module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          // Ensure that all packages starting with prefix are transpiled.
          '@twotalltotems/react-native-otp-input',
        ],
      },
    },
    argv
  );
  return config;
};
