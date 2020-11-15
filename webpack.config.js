module.exports = {
  watch: true,
  mode: "development",
  target: 'node',
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "webpack.tsconfig.json"
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};