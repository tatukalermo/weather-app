const webpack = require("webpack");

const TransferWebpackPlugin = require("transfer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    contentBase: "src/public",
    historyApiFallback: true,
    port: 8000,
    host: "0.0.0.0",
    disableHostCheck: true,
  },
  devtool: "eval",
  output: {
    filename: "index.jsx",
    publicPath: "/",
  },
  externals: {
    cheerio: "window",
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/react"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "src/public/index.html" }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new TransferWebpackPlugin([{ from: "src/public" }], "."),
  ],
};
