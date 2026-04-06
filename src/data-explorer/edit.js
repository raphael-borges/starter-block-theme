/**
 * Recupera as traduções.
 */
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";

/**
 * Hooks e componentes do Gutenberg.
 */
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	PanelBody,
	Button,
	TextareaControl,
	TextControl,
	Placeholder,
} from "@wordpress/components";
import { useState } from "@wordpress/element";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 */
import "./editor.scss";

/**
 * Função de Edição do Bloco.
 */
export default function Edit({ attributes, setAttributes }) {
	const { title, contactText, contactUrl, items } = attributes;

	// Estado para rastrear qual item (0 a 5) está sendo editado na barra lateral
	const [activeItemIndex, setActiveItemIndex] = useState(0);

	// Função auxiliar para atualizar um item específico no array de atributos
	const updateItemProperty = (index, property, value) => {
		const newItems = [...items];
		newItems[index] = { ...newItems[index], [property]: value };
		setAttributes({ items: newItems });
	};

	// Imagem que aparecerá no lado esquerdo do editor (a do item ativo)
	const currentImageUrl = items[activeItemIndex]?.imageUrl;

	return (
		<>
			{/* BARRA LATERAL (INSPECTOR CONTROLS) */}
			<InspectorControls>
				<PanelBody title={__("Configuração Principal", metadata.textdomain)}>
					<TextControl
						label={__("URL/Link de Contato", metadata.textdomain)}
						value={contactUrl}
						onChange={(val) => setAttributes({ contactUrl: val })}
					/>
					<TextControl
						label={__("Texto do Botão de Contato", metadata.textdomain)}
						value={contactText}
						onChange={(val) => setAttributes({ contactText: val })}
					/>
				</PanelBody>

				{/* GERENCIAMENTO DOS 6 BOTÕES */}
				{items.map((item, index) => (
					<PanelBody
						key={index}
						title={`${__("Botão", metadata.textdomain)} ${index + 1}: ${item.label || "Vazio"}`}
						initialOpen={index === activeItemIndex}
						onToggle={() => setActiveItemIndex(index)} // Ativa este item na sidebar e no preview
					>
						{/* Upload do Ícone SVG */}
						<TextareaControl
							label={__("Ícone SVG (Cole o código <svg>)", metadata.textdomain)}
							help={__("Abra o arquivo SVG em um editor de texto e cole o código aqui.", metadata.textdomain)}
							value={item.svg}
							onChange={(val) => updateItemProperty(index, "svg", val)}
						/>

						{/* Texto do Botão */}
						<TextControl
							label={__("Texto do Botão", metadata.textdomain)}
							value={item.label}
							onChange={(val) => updateItemProperty(index, "label", val)}
						/>

						{/* Upload da Imagem que muda */}
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => {
									updateItemProperty(index, "imageId", media.id);
									updateItemProperty(index, "imageUrl", media.url);
								}}
								allowedTypes={["image"]}
								value={item.imageId}
								render={({ open }) => (
									<Button
										isPrimary
										onClick={open}
										icon="images-alt"
										style={{ marginTop: "10px", width: "100%", justifyContent: "center" }}
									>
										{item.imageUrl
											? __("Alterar Imagem", metadata.textdomain)
											: __("Adicionar Imagem", metadata.textdomain)}
									</Button>
								)}
							/>
							{item.imageUrl && (
								<Button
									isDestructive
									isLink
									onClick={() => {
										updateItemProperty(index, "imageId", 0);
										updateItemProperty(index, "imageUrl", "");
									}}
									style={{ marginTop: "10px" }}
								>
									{__("Remover Imagem", metadata.textdomain)}
								</Button>
							)}
						</MediaUploadCheck>
					</PanelBody>
				))}
			</InspectorControls>

			{/* INTERFACE NO EDITOR */}
			<div {...useBlockProps()}>
				<div className="data-explorer-editor-wrapper">
					
					{/* Lado Esquerdo: Preview da Imagem Dinâmica */}
					<div className="preview-image-side">
						{currentImageUrl ? (
							<img src={currentImageUrl} alt="Visualização Ativa" />
						) : (
							<Placeholder
								icon="images-alt"
								label={__("Preview da Imagem", metadata.textdomain)}
								instructions={__(
									"Selecione um botão à direita para ver ou adicionar sua imagem.",
									metadata.textdomain
								)}
							/>
						)}
					</div>

					{/* Lado Direito: A Interface de Seleção com Glassmorphism */}
					<div className="selection-side">
						<RichText
							tagName="h2"
							className="main-title"
							value={title}
							onChange={(val) => setAttributes({ title: val })}
							placeholder={__("Insira o título aqui...", metadata.textdomain)}
						/>

						<div className="grid-buttons">
							{items.map((item, index) => (
								<button
									key={index}
									className={`item-card ${index === activeItemIndex ? "is-active" : ""}`}
									onClick={() => setActiveItemIndex(index)}
								>
									{/* Preview do SVG */}
									{item.svg && (
										<div
											className="icon-wrapper"
											dangerouslySetInnerHTML={{ __html: item.svg }}
										/>
									)}
									<span>{item.label}</span>
								</button>
							))}
						</div>

						{/* Botão de Contato com classes padrão do WordPress */}
						<div className="contact-action wp-block-buttons">
							<div className="wp-block-button">
								<a 
									className="wp-block-button__link wp-element-button" 
									onClick={(e) => e.preventDefault()}
									style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
								>
									{contactText} 
									<span className="arrow" aria-hidden="true" style={{ display: 'flex' }}>
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M9 7L14 12L9 17" stroke="white" strokeWidth="2" strokeLinecap="square"/>
										</svg>
									</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}