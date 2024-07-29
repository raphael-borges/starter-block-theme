import { useBlockProps } from "@wordpress/block-editor";
import "./style.scss";

export default function save({ attributes }) {
	const { images, uniqueId } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<div className="galeria">
				<div
					className="slide-wrapper"
					id={`slide-wrapper-${uniqueId}`}
					data-id={uniqueId}
				>
					<ul className="slide" id={`slide-${uniqueId}`} data-id={uniqueId}>
						{images &&
							images.map((image) => (
								<li key={image.id}>
									<img src={image.url} alt={image.alt} />
								</li>
							))}
					</ul>
				</div>

				<ul
					className="custom-controls"
					id={`custom-controls-${uniqueId}`}
					data-id={uniqueId}
				>
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
