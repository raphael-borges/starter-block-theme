import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks, InspectorControls, MediaPlaceholder } from "@wordpress/block-editor";
import { PanelBody, SelectControl, Button } from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { video1080, video720, video480, videoSize } = attributes;

	// Função para renderizar o seletor de cada versão
	const VideoSelector = (label, attrName, currentVal) => (
		<div style={{ marginBottom: '15px' }}>
			<p><strong>{label}</strong></p>
			{currentVal ? (
				<Button isDestructive onClick={() => setAttributes({ [attrName]: undefined })}>Remover Vídeo</Button>
			) : (
				<MediaPlaceholder
					onSelect={(media) => setAttributes({ [attrName]: media.url })}
					allowedTypes={['video']}
					multiple={false}
					labels={{ title: label }}
				/>
			)}
		</div>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Arquivos de Vídeo")}>
					{VideoSelector("Versão 1080p (Full HD)", "video1080", video1080)}
					{VideoSelector("Versão 720p (HD)", "video720", video720)}
					{VideoSelector("Versão 480p (SD)", "video480", video480)}
					
					<hr />
					<SelectControl
						label={__("Resolução Ativa")}
						value={videoSize}
						options={[
							{ label: '1080p', value: '1080p' },
							{ label: '720p', value: '720p' },
							{ label: '480p', value: '480p' },
						]}
						onChange={(value) => setAttributes({ videoSize: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps({ className: `has-video-size-${videoSize}` })}>
				<div className="video-container">
					{/* No editor, mostramos o vídeo da resolução selecionada no SelectControl */}
					{attributes[`video${videoSize.replace('p','')}`] && (
						<video src={attributes[`video${videoSize.replace('p','')}`]} autoPlay muted loop className="bg-video" />
					)}
					<div className="block-content">
						<InnerBlocks />
					</div>
				</div>
			</div>
		</>
	);
}