import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import "./editor.scss";

export default function Edit() {
	const slug = metadata.name.split("/")[1];
	const blockProps = useBlockProps({
		className: `sbt-section sbt-section--editor sbt-section--${slug}`,
	});
	const label = metadata.title.replace(/^Sessão\s*—\s*/, "");

	return (
		<div {...blockProps}>
			<div className="sbt-section__editor-bar">
				<span className="sbt-section__editor-badge">
					{__("Sessão", "starter-block-theme")}
				</span>
				<span className="sbt-section__editor-title">{label}</span>
			</div>
			<div className="sbt-section__editor-body">
				<InnerBlocks renderAppender={InnerBlocks.ButtonBlockAppender} />
			</div>
			<p className="sbt-section__editor-hint">
				{__(
					"Bloco dummy. O layout definitivo será aplicado depois, sem alterar a navegação espacial.",
					"starter-block-theme"
				)}
			</p>
		</div>
	);
}
