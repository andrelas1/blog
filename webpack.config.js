const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const fs = require("fs");

const blogpostsHtmlFilesFolder = `${
  process.env.GITHUB_WORKSPACE || process.cwd()
}/src/ssg/html-files`;
const files = fs
  .readdirSync(blogpostsHtmlFilesFolder)
  .filter((file) => !file.startsWith("index") && !file.startsWith("about-me"));

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

module.exports = (env, argv) => ({
  entry: {
    index: "./frontend/src/index/main.ts",
    blogpost: "./frontend/src/blogpost/main.ts",
    aboutme: "./frontend/src/about-me/main.ts",
  },
  devtool: argv.mode === "production" ? "" : "inline-source-map",
  mode: argv.mode === "production" ? "production" : "development",
  output: {
    path: path.resolve(__dirname, "public"),
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
      filename: "index.html",
      template: "!!raw-loader!src/ssg/html-files/index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "about-me.html",
      template: "!!raw-loader!src/ssg/html-files/about-me.html",
      chunks: ["aboutme"],
    }),
    ...files.map(
      (fileName) =>
        new HtmlWebpackPlugin({
          filename: `blogposts/${fileName}`,
          template: `!!raw-loader!src/ssg/html-files/${fileName}`,
          chunks: ["blogpost"],
        })
    ),
    new WebpackBuildNotifierPlugin({
      suppressWarning: true,
    }),
  ],
});
