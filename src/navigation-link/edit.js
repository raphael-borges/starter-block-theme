/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * WordPress dependencies
 */
import { TextControl, Button, Flex, FlexBlock } from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { items = [] } = attributes;

	// Helper to update a specific item
	const updateItem = (index, field, value) => {
		const newItems = [...items];
		newItems[index][field] = value;
		setAttributes({ items: newItems });
	};

	// Add a new empty item
	const addItem = () => {
		setAttributes({
			items: [...items, { label: "", url: "" }],
		});
	};

	// Remove an item
	const removeItem = (index) => {
		const newItems = items.filter((_, i) => i !== index);
		setAttributes({ items: newItems });
	};

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			{/* Preview da lista no editor (apenas visual) */}
			<ul className="wp-block-starter-block-theme-inline-nav__list preview">
				{items.map((item, index) => (
					<li 
						key={index} 
						className={`wp-block-starter-block-theme-inline-nav__item ${
							index === 0 ? "active" : ""
						}`}
					>
						<a href={item.url}>
							{item.label || __("(no label)", metadata.textdomain)}
						</a>
					</li>
				))}
			</ul>

			{/* Formulário de edição dos itens */}
			{items.map((item, index) => (
				<Flex key={index} className="inline-nav-item" align="center">
					<FlexBlock>
						<TextControl
							label={__("Label", metadata.textdomain)}
							value={item.label}
							onChange={(value) => updateItem(index, "label", value)}
							help={__("The text that will be displayed", metadata.textdomain)}
						/>
					</FlexBlock>
					<FlexBlock>
						<TextControl
							label={__("URL", metadata.textdomain)}
							value={item.url}
							onChange={(value) => updateItem(index, "url", value)}
							help={__("Link destination", metadata.textdomain)}
						/>
					</FlexBlock>
					<Button
						isDestructive
						onClick={() => removeItem(index)}
						className="remove-item-button"
					>
						{__("Remove", metadata.textdomain)}
					</Button>
				</Flex>
			))}
			<Button isSecondary onClick={addItem} style={{ marginTop: "1rem" }}>
				{__("Add new item", metadata.textdomain)}
			</Button>
		</div>
	);
}