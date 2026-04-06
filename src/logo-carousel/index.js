/**
 * Registro do bloco Carrossel de Logos.
 */
import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";

import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import icons from "../icons";

registerBlockType(metadata.name, {
	icon: icons.primary,
	edit: Edit,
	save,
});