/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props
 * @param {Object} props.attributes
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { items = [] } = attributes;

	return (
		<nav {...useBlockProps.save()}>
			<ul className="wp-block-starter-block-theme-inline-nav__list">
				{items.map((item, index) => (
					<li 
						key={index} 
						className={`wp-block-starter-block-theme-inline-nav__item ${
							index === 0 ? "active" : ""
						}`}
					>
						<a href={item.url}>{item.label}</a>
					</li>
				))}
			</ul>
		</nav>
	);
}