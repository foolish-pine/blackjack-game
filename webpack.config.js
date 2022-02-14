module.exports = {
  mode: "development",
  target: "node",
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: [/node_modules/, /__test__/],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
