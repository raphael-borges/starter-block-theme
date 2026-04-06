/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import icons from "../icons"; // Certifique-se que este arquivo existe no diretório pai

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType(metadata.name, {
	/**
	 * O ícone é extraído do arquivo de ícones centralizado do seu tema/plugin.
	 */
	icon: icons.primary,

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});