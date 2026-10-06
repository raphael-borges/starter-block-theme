#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f "package.json" || ! -f "style.css" ]]; then
	echo "❌ Rode de dentro de wp-content/themes/starter-block-theme/"
	exit 1
fi

echo "📦 Criando bloco pai: spatial-canvas"
mkdir -p src/spatial-canvas

# ============== BLOCO PAI ==============
cat > src/spatial-canvas/block.json << 'EOF'
{
	"$schema": "https://schemas.wp.org/trunk/block.json",
	"apiVersion": 3,
	"name": "starter-block-theme/spatial-canvas",
	"version": "1.0.0",
	"title": "Canvas Espacial 2D",
	"category": "start-category",
	"icon": "screenoptions",
	"description": "Container orquestrador fullscreen da home.",
	"keywords": ["canvas", "spatial", "fullscreen", "portfolio"],
	"textdomain": "starter-block-theme",
	"supports": {
		"interactivity": true,
		"html": false,
		"align": ["full"],
		"anchor": true,
		"multiple": false,
		"reusable": false
	},
	"attributes": {
		"totalSections": { "type": "number", "default": 5 },
		"autoAdvanceMs": { "type": "number", "default": 8000 },
		"ctaLabel": { "type": "string", "default": "Ver trabalho" },
		"ctaUrl": { "type": "string", "default": "#" }
	},
	"render": "file:./render.php",
	"viewScriptModule": "file:./view.js",
	"editorScript": "file:./index.js",
	"editorStyle": "file:./index.css",
	"style": "file:./style-index.css"
}
EOF

cat > src/spatial-canvas/index.js << 'EOF'
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
EOF

cat > src/spatial-canvas/save.js << 'EOF'
export default function save() {
	return null;
}
EOF

cat > src/spatial-canvas/edit.js << 'EOF'
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
EOF

echo "✅ bloco pai criado em src/spatial-canvas/"
echo ""
echo "👉 Agora rode: npm run build"
echo ""
