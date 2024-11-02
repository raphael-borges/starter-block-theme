const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { Compilation } = require("webpack");

// Função para gerar entradas múltiplas
const generateEntries = () => {
	const entries = {};
	glob.sync("./assets/css/**/*.scss").forEach((file) => {
		const name = path.relative("./assets/css", file).replace(".scss", "");
		entries[name] = path.resolve(__dirname, "..", file);
	});
	return entries;
};

class RemoveJsFilesPlugin {
	apply(compiler) {
		compiler.hooks.thisCompilation.tap("RemoveJsFilesPlugin", (compilation) => {
			compilation.hooks.processAssets.tap(
				{
					name: "RemoveJsFilesPlugin",
					stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
				},
				(assets) => {
					Object.keys(assets).forEach((asset) => {
						if (asset.endsWith(".js")) {
							delete assets[asset];
						}
					});
				},
			);
		});
	}
}

module.exports = {
	mode: "production",
	resolve: {
		preferRelative: true,
	},
	entry: generateEntries(),
	output: {
		path: path.resolve(__dirname, "..", "assets", "css"), // Diretório de saída
	},
	module: {
		rules: [
			{
				test: /\.scss$/, // Regex para arquivos SCSS
				use: [
					MiniCssExtractPlugin.loader, // Extrai CSS para arquivos separados
					"css-loader", // Transforma CSS em CommonJS
					"sass-loader", // Compila SCSS para CSS
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Gera um arquivo CSS separado para cada entrada
			filename: "[name].min.css",
		}),
		new RemoveJsFilesPlugin(),
	],
	optimization: {
		// Desabilita completamente a geração de arquivos JS
		splitChunks: false,
		runtimeChunk: false,
	},
};
