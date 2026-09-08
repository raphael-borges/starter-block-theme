import { __ } from "@wordpress/i18n";
import { useBlockProps, MediaPlaceholder, MediaUpload, MediaUploadCheck, BlockControls } from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarButton, Button } from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const { images } = attributes;

    const onSelectImages = (newImages) => {
        const formattedImages = newImages.map((img) => ({
            id: img.id,
            url: img.url || img.sizes?.full?.url,
            alt: img.alt || "",
        }));
        setAttributes({ images: formattedImages });
    };

    // Divide as imagens entre a coluna 1 e a coluna 2
    const slider1Images = images.filter((_, index) => index % 2 === 0);
    const slider2Images = images.filter((_, index) => index % 2 !== 0);

    return (
        <div {...blockProps}>
            {images.length > 0 && (
                <BlockControls>
                    <ToolbarGroup>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectImages}
                                allowedTypes={["image"]}
                                multiple
                                gallery
                                value={images.map((img) => img.id)}
                                render={({ open }) => (
                                    <ToolbarButton onClick={open}>
                                        {__("Editar Galeria", "starter-block-theme")}
                                    </ToolbarButton>
                                )}
                            />
                        </MediaUploadCheck>
                    </ToolbarGroup>
                </BlockControls>
            )}

            {images.length === 0 ? (
                <MediaPlaceholder
                    onSelect={onSelectImages}
                    allowedTypes={["image"]}
                    multiple
                    gallery
                    labels={{
                        title: __("Dual Vertical Slider", "starter-block-theme"),
                        instructions: __("Selecione imagens para a galeria do slider.", "starter-block-theme"),
                    }}
                />
            ) : (
                <div className="slider-wrapper">
                    <div className="dual-slider-grid">
                        {/* Slider Esquerdo */}
                        <div className="vertical-slider">
                            <div className="slider-track">
                                {slider1Images.length > 0 ? (
                                    slider1Images.map((img, i) => (
                                        <img
                                            key={img.id || i}
                                            src={img.url}
                                            alt={img.alt}
                                            className={`slide ${i === 0 ? "active" : ""}`}
                                        />
                                    ))
                                ) : (
                                    <div className="slider-placeholder">{__("Adicione mais fotos", "starter-block-theme")}</div>
                                )}
                            </div>
                        </div>

                        {/* Slider Direito (com desfasamento) */}
                        <div className="vertical-slider slider-offset">
                            <div className="slider-track">
                                {slider2Images.length > 0 ? (
                                    slider2Images.map((img, i) => (
                                        <img
                                            key={img.id || i}
                                            src={img.url}
                                            alt={img.alt}
                                            className={`slide ${i === 0 ? "active" : ""}`}
                                        />
                                    ))
                                ) : (
                                    <div className="slider-placeholder">{__("Adicione mais fotos", "starter-block-theme")}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "12px", textAlign: "center" }}>
                        <MediaUploadCheck>
                            <Button variant="secondary" onClick={() => setAttributes({ images: [] })}>
                                {__("Remover todas as imagens", "starter-block-theme")}
                            </Button>
                        </MediaUploadCheck>
                    </div>
                </div>
            )}
        </div>
    );
}