import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import "./editor.scss";

const TEMPLATE = [
	["starter-block-theme/section-hero"],
	["starter-block-theme/section-services"],
	["starter-block-theme/section-trajectory"],
	["starter-block-theme/section-portfolio"],
	["starter-block-theme/section-contact"],
];

export default function Edit({ clientId }) {
	const blockProps = useBlockProps({
		className: "sbt-spatial-canvas sbt-spatial-canvas--editor",
	});
	const innerBlocks = useSelect(
		(select) => select("core/block-editor").getBlocks(clientId),
		[clientId]
	);
	const totalSections = Array.isArray(innerBlocks) ? innerBlocks.length : 0;

	return (
		<div {...blockProps}>
			<div className="sbt-spatial-canvas__editor-header">
				<span className="sbt-spatial-canvas__editor-badge">
					{__("Canvas Espacial 2D", "starter-block-theme")}
				</span>
				<span className="sbt-spatial-canvas__editor-count">
					{totalSections} {__("sessões", "starter-block-theme")}
				</span>
			</div>
			<div className="sbt-spatial-canvas__editor-stage">
				<InnerBlocks
					template={TEMPLATE}
					templateLock={false}
					renderAppender={InnerBlocks.ButtonBlockAppender}
				/>
			</div>
		</div>
	);
}
