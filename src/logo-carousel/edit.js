import { __ } from "@wordpress/i18n";
import { useBlockProps, MediaPlaceholder, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, Button } from "@wordpress/components";

import "./editor.scss";
import metadata from "./block.json";

export default function Edit({ attributes, setAttributes }) {
	const { images } = attributes;

	// Salva as imagens selecionadas no array de atributos
	const onSelectImages = (newImages) => {
		const mappedImages = newImages.map((img) => ({
			id: img.id,
			url: img.url,
			alt: img.alt || "Logo"
		}));
		setAttributes({ images: mappedImages });
	};

	// Permite excluir um logo individualmente no editor
	const removeImage = (idToRemove) => {
		setAttributes({
			images: images.filter((img) => img.id !== idToRemove)
		});
	};

	return (
		<div {...useBlockProps()}>
			{/* Se não houver imagens, mostra o botão de upload da galeria */}
			{images.length === 0 ? (
				<MediaPlaceholder
					icon="format-gallery"
					labels={{ title: __("Logotipos do Carrossel", metadata.textdomain) }}
					onSelect={onSelectImages}
					accept="image/*"
					multiple={true}
				/>
			) : (
				<div className="logo-carousel-editor-wrapper">
					<InspectorControls>
						<PanelBody title={__("Gerenciar Logos", metadata.textdomain)}>
							<p>{__("Para trocar a seleção, limpe a galeria e selecione novamente.", metadata.textdomain)}</p>
							<Button isDestructive variant="secondary" onClick={() => setAttributes({ images: [] })}>
								{__("Limpar Todos os Logos", metadata.textdomain)}
							</Button>
						</PanelBody>
					</InspectorControls>

					{/* Mostra um grid estático com as imagens no editor para facilitar visualização */}
					<div className="editor-logo-grid">
						{images.map((img) => (
							<div key={img.id} className="logo-item-preview">
								<img src={img.url} alt={img.alt} />
								<button 
									onClick={() => removeImage(img.id)} 
									className="remove-btn"
									title={__("Remover logo", metadata.textdomain)}
								>
									×
								</button>
							</div>
						))}
					</div>
					<div className="editor-notice">
						<em>{__("No site (front-end), estes logos estarão rolando continuamente da direita para a esquerda.", metadata.textdomain)}</em>
					</div>
				</div>
			)}
		</div>
	);
}