const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => ({
  entry: {
    index: "./frontend/src/index/main.ts",
    blogpost: "./frontend/src/blogpost/main.ts",
  },
  devtool: argv.mode === "production" ? "" : "inline-source-map",
  mode: argv.mode === "production" ? "production" : "development",
  output: {
    path: path.resolve(__dirname, "statics"),
    filename: "[name]/[name].[hash].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: [
                "./frontend/src/shared/styles/colors.scss",
                "./frontend/src/shared/styles/mixins.scss",
                "./frontend/src/shared/styles/fonts.scss",
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".scss"],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8000,
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index/index.ejs",
      template: "!!raw-loader!frontend/src/index/index.ejs",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "blogpost/blogpost.ejs",
      template: "!!raw-loader!frontend/src/blogpost/blogpost.ejs",
      chunks: ["blogpost"],
    }),
    // new MiniCssExtractPlugin({
    //   filename: "[name]/[name].css",
    //   chunkFilename: "[id].css",
    // }),
  ],
});
