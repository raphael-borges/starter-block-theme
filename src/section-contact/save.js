import { InnerBlocks } from "@wordpress/block-editor";

/**
 * Bloco dinâmico com InnerBlocks.
 * O `<InnerBlocks.Content />` é o que faz o WordPress serializar o conteúdo
 * filho dentro do post_content. O HTML real vem do render.php no servidor.
 */
export default function save() {
	return <InnerBlocks.Content />;
}
