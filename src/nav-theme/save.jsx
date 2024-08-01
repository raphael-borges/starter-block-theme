import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from "@wordpress/block-editor";

import { __ } from "@wordpress/i18n";
import "./style.scss";
import metadata from "./block.json";

export default function save() {
	const blockProps = useBlockProps.save({
		className: "menu",
	});

	return (
		<>
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
					<ul {...blockProps}>
						<InnerBlocks.Content />
					</ul>
				</div>
			</nav>
		</>
	);
}
