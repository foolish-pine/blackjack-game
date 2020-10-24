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
        use: "ts-loader",
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};