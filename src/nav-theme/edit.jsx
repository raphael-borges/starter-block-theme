import "./editor.scss";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { select } from "@wordpress/data";

export default function Edit(attributes, className, setAttributes) {
	const ALLOWED_BLOCKS = ["core/navigation-link", "core/navigation-submenu"];

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps();

	const blocks = select("core/editor").getBlocks();

	console.log({ ...innerBlocksProps }, { ...blockProps });

	return (
		<div {...blockProps}>
			<nav className="navbar-theme">
				<button
					className="burger"
					id="burger"
					aria-label={__("Open Menu", metadata.textdomain)}
					aria-expanded="false"
				>
					<span className="burger-line"></span>
					<span className="burger-line"></span>
					<span className="burger-line"></span>
				</button>
				<div className="navbar-theme-block" id="menu">
					<ul className="menu">
						<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
					</ul>
				</div>
			</nav>
		</div>
	);
}
