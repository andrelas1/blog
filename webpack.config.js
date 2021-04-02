const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => ({
  entry: {
    index: "./frontend/src/index/main.ts",
    blogpost: "./frontend/src/blogpost/main.ts",
  },
  devtool: argv.mode === "production" ? "" : "inline-source-map",
  mode: argv.mode === "production" ? "production" : "development",
  output: {
    path: path.resolve(__dirname, "statics"),
    filename: "[name].[hash].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
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
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.webpack.json",
        },
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
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.ejs",
      template: "!!raw-loader!frontend/src/index/index.ejs",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "blogpost.ejs",
      template: "!!raw-loader!frontend/src/blogpost/blogpost.ejs",
      chunks: ["blogpost"],
    }),
    // new MiniCssExtractPlugin({
    //   filename: "[name]/[name].css",
    //   chunkFilename: "[id].css",
    // }),
  ],
});
