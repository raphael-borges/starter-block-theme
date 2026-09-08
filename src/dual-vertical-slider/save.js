import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
    const { images } = attributes;

    if (!images || images.length === 0) {
        return null;
    }

    const slider1Images = images.filter((_, index) => index % 2 === 0);
    const slider2Images = images.filter((_, index) => index % 2 !== 0);

    return (
        <div {...useBlockProps.save()}>
            <div className="slider-wrapper">
                <div className="dual-slider-grid">
                    {/* Slider Esquerdo */}
                    <div className="vertical-slider" data-interval="5500">
                        <div className="slider-track">
                            {slider1Images.map((img, index) => (
                                <img
                                    key={img.id || index}
                                    src={img.url}
                                    alt={img.alt}
                                    className={`slide ${index === 0 ? "active" : ""}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Slider Direito */}
                    <div className="vertical-slider slider-offset" data-interval="7000">
                        <div className="slider-track">
                            {slider2Images.map((img, index) => (
                                <img
                                    key={img.id || index}
                                    src={img.url}
                                    alt={img.alt}
                                    className={`slide ${index === 0 ? "active" : ""}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}