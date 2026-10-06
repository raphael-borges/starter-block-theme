#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f "package.json" || ! -f "style.css" ]]; then
	echo "❌ Rode de dentro de wp-content/themes/starter-block-theme/"
	exit 1
fi

SECTIONS=(
	"section-hero|Sessão — Hero (Início)|Início|01|1|cover-image|hero início home sessão"
	"section-services|Sessão — Serviços|Serviços|02|3|screenoptions|serviços services sessão"
	"section-trajectory|Sessão — Trajetória|Trajetória|03|4|chart-line|trajetória trajectory carreira sessão"
	"section-portfolio|Sessão — Portfólio|Portfólio|04|6|portfolio|portfólio portfolio trabalhos sessão"
	"section-contact|Sessão — Contato|Contato|05|1|email|contato contact whatsapp sessão"
)

for row in "${SECTIONS[@]}"; do
	IFS='|' read -r slug title sec_title sec_num slides icon keywords <<< "$row"
	DIR="src/$slug"
	mkdir -p "$DIR"

	KEYWORDS_JSON=$(echo "$keywords" | awk '{for(i=1;i<=NF;i++) printf "\"%s\"%s", $i, (i<NF?", ":"")}')

	# ---------- block.json ----------
	cat > "$DIR/block.json" <<EOF
{
	"\$schema": "https://schemas.wp.org/trunk/block.json",
	"apiVersion": 3,
	"name": "starter-block-theme/$slug",
	"version": "1.0.0",
	"title": "$title",
	"category": "start-category",
	"icon": "$icon",
	"description": "Sessão $sec_num — $sec_title.",
	"keywords": [$KEYWORDS_JSON],
	"textdomain": "starter-block-theme",
	"parent": ["starter-block-theme/spatial-canvas"],
	"supports": {
		"interactivity": true,
		"html": false,
		"multiple": false,
		"reusable": false,
		"anchor": true
	},
	"attributes": {
		"sectionTitle":  { "type": "string", "default": "$sec_title" },
		"sectionNumber": { "type": "string", "default": "$sec_num" },
		"slideCount":    { "type": "number", "default": $slides }
	},
	"render": "file:./render.php",
	"editorScript": "file:./index.js",
	"editorStyle": "file:./index.css",
	"style": "file:./style-index.css"
}
EOF

	# ---------- index.js ----------
	cat > "$DIR/index.js" <<'EOF'
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

	# ---------- save.js ----------
	cat > "$DIR/save.js" <<'EOF'
export default function save() {
	return null;
}
EOF

	# ---------- edit.js ----------
	cat > "$DIR/edit.js" <<'EOF'
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
EOF

	# ---------- editor.scss ----------
	cat > "$DIR/editor.scss" <<'EOF'
.sbt-section--editor {
	position: relative;
	display: block;
	width: 100%;
	min-height: 240px;
	padding: 22px 22px 18px;
	background: #14141a;
	color: #f5f5f7;
	border-radius: 14px;
	border: 1px solid rgba(255, 255, 255, 0.08);

	.sbt-section__editor-bar { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
	.sbt-section__editor-badge {
		font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
		padding: 3px 8px; border-radius: 999px;
		background: rgba(255, 255, 255, 0.08); opacity: 0.85;
	}
	.sbt-section__editor-title { font-size: 15px; font-weight: 600; letter-spacing: 0.02em; opacity: 0.95; }
	.sbt-section__editor-body {
		padding: 14px; border-radius: 10px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px dashed rgba(255, 255, 255, 0.12);
	}
	.sbt-section__editor-hint { margin: 12px 0 0; font-size: 11.5px; line-height: 1.5; opacity: 0.55; }
}
EOF

	# ---------- style.scss ----------
	cat > "$DIR/style.scss" <<'EOF'
.sbt-section {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 6vh 6vw;
	overflow: hidden;
	box-sizing: border-box;

	&__inner { position: relative; width: 100%; max-width: 1200px; display: flex; flex-direction: column; gap: 1.25rem; }
	&__placeholder { display: flex; flex-direction: column; gap: 0.75rem; opacity: 0.5; }
	&__number { font-size: clamp(3rem, 8vw, 6rem); font-weight: 800; line-height: 1; letter-spacing: -0.04em; }
	&__title { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 600; letter-spacing: -0.01em; }
	&__caption { font-size: 0.9rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.7; }
}
EOF

	# ---------- render.php ----------
	cat > "$DIR/render.php" <<'EOF'
<?php
/**
 * Render do bloco de sessão do Canvas Espacial 2D.
 *
 * @package StarterBlockTheme
 */

$section_title = isset( $attributes['sectionTitle'] ) ? (string) $attributes['sectionTitle'] : '';
$slide_count   = isset( $attributes['slideCount'] ) ? (int) $attributes['slideCount'] : 1;
$section_num   = isset( $attributes['sectionNumber'] ) ? (string) $attributes['sectionNumber'] : '';

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class'                   => 'sbt-section',
		'data-sbt-section'        => '1',
		'data-sbt-section-title'  => esc_attr( $section_title ),
		'data-sbt-section-slides' => esc_attr( (string) $slide_count ),
	)
);
?>
<div
	<?php echo $wrapper_attributes; ?>
	data-wp-interactive="starterPortfolio"
>
	<div class="sbt-section__inner">
		<div class="sbt-section__placeholder" aria-hidden="true">
			<?php if ( $section_num ) : ?>
				<span class="sbt-section__number"><?php echo esc_html( $section_num ); ?></span>
			<?php endif; ?>
			<?php if ( $section_title ) : ?>
				<span class="sbt-section__title"><?php echo esc_html( $section_title ); ?></span>
			<?php endif; ?>
			<span class="sbt-section__caption">
				<?php esc_html_e( 'Sessão dummy — aguardando layout', 'starter-block-theme' ); ?>
			</span>
		</div>
		<div class="sbt-section__content">
			<?php echo $content; ?>
		</div>
	</div>
</div>
EOF

	echo "✅ src/$slug criado"
done

echo ""
echo "🎉 5 blocos filhos criados."
