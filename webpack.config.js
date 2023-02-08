const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const baseConfig = {
  entry: path.resolve(__dirname, "./src/index"),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"]
      },
      {
        test: /\.(jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: path.join("assets/img", "[name][ext]")
        }
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: {
          filename: path.join("assets/svg", "[name][ext]")
        }
      },
      {
        test: /\.png$/i,
        type: "asset/resource",
        generator: {
          filename: path.join("assets/png", "[name][ext]")
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html"
    }),
    new CleanWebpackPlugin(),
    new EslintPlugin({ extensions:['ts']}),
  ]
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === "prod";
  const envConfig = isProductionMode ? require("./webpack.prod.config") : require("./webpack.dev.config");

  return merge(baseConfig, envConfig);
};
