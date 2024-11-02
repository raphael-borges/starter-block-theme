const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: "production",
	entry: "./assets/js/index.js",
	output: {
		filename: "index.min.js",
		path: path.resolve(__dirname, "../assets/js"),
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
};
