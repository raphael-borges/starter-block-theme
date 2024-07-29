import "./editor.scss";
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
	BlockControls,
} from "@wordpress/block-editor";
import { Button, PanelBody, ToolbarButton } from "@wordpress/components";
import { gallery } from "@wordpress/icons";

export default function Edit({ attributes, setAttributes }) {
	const { uniqueId, images } = attributes;

	// Gera um ID único para cada bloco
	const generateUniqueId = () => {
		return `gallery-${Math.random().toString(36).substr(2, 9)}`;
	};
	const imagesGallery = images.map((image) => image.id);

	if (!uniqueId) {
		setAttributes({ uniqueId: generateUniqueId() });
	}
	const onSelectImages = (newImages) => {
		setAttributes({ images: newImages });
	};

	function MediaUploadButton({ onSelect, value, render }) {
		return (
			<MediaUploadCheck>
				<MediaUpload
					onSelect={onSelect}
					allowedTypes={["image"]}
					multiple
					gallery
					value={value}
					render={render}
				/>
			</MediaUploadCheck>
		);
	}

	return (
		<div {...useBlockProps()}>
			<BlockControls>
				<MediaUploadButton
					onSelect={onSelectImages}
					value={imagesGallery}
					render={({ open }) => (
						<ToolbarButton
							onClick={open}
							icon={gallery}
							label={__("Select Images", "starter-block-theme")}
						/>
					)}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__("Gallery Settings", "starter-block-theme")}>
					<ul className="preview-galery-slider-block">
						{images &&
							images.map((image) => (
								<li key={image.id}>
									<img src={image.sizes.thumbnail.url} alt={image.alt} />
								</li>
							))}
					</ul>
					<MediaUploadButton
						onSelect={onSelectImages}
						value={imagesGallery}
						render={({ open }) => (
							<Button onClick={open} variant="primary">
								{__("Select Images", "starter-block-theme")}
							</Button>
						)}
					/>
				</PanelBody>
			</InspectorControls>
			{images.length === 0 && (
				<MediaUploadButton
					onSelect={onSelectImages}
					value={imagesGallery}
					render={({ open }) => (
						<Button
							onClick={open}
							variant="primary"
							style={{ display: "block", margin: "32px auto" }}
						>
							{__("Select Images", "starter-block-theme")}
						</Button>
					)}
				/>
			)}
			<div className="galeria">
				<div className="slide-wrapper">
					<ul className="slide">
						{images &&
							images.map((image) => (
								<li key={image.id}>
									<img src={image.url} alt={image.alt} />
								</li>
							))}
					</ul>
				</div>
				<ul className="custom-controls">
					{images &&
						images.map((image) => (
							<li
								key={image.id}
								style={{ backgroundImage: `url(${image.url})` }}
							></li>
						))}
				</ul>
			</div>
		</div>
	);
}
