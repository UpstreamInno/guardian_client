module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            Store: "./src/store",
            Components: "./src/components",
            Lib: "./src/lib",
          },
        },
      ],
    ],
  };
};
