import { registerBlockType } from "@wordpress/blocks";
import "./editor.scss";
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import icons from "../icons";

registerBlockType(metadata.name, {
	icon: icons.primary,
	edit: Edit,
	save,
});
