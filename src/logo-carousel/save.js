import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { images } = attributes;

	if (!images || images.length === 0) return null;

	return (
		<div {...useBlockProps.save()}>
			<div className="logo-carousel-container">
				{/* A trilha que vai deslizar */}
				<div className="logo-carousel-track">
					
					{/* Primeiro Set de Imagens */}
					{images.map((img, index) => (
						<div key={`orig-${index}`} className="logo-slide">
							<img src={img.url} alt={img.alt} loading="lazy" />
						</div>
					))}

					{/* Segundo Set Clonado para o Efeito Infinito */}
					{images.map((img, index) => (
						<div key={`dup-${index}`} className="logo-slide" aria-hidden="true">
							<img src={img.url} alt={img.alt} loading="lazy" />
						</div>
					))}

				</div>
			</div>
		</div>
	);
}