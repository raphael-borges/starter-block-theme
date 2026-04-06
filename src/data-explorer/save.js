/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 */
export default function save({ attributes }) {
	const { title, contactText, contactUrl, items } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<div className="data-explorer-wrapper">
				
				{/* Lado Esquerdo: Imagem Inicial (Puxa a imagem do primeiro item por padrão) */}
				<div className="image-display">
					{items[0]?.imageUrl && (
						<img id="main-feature-image" src={items[0].imageUrl} alt="Data Explorer Preview" />
					)}
				</div>

				{/* Lado Direito: Interface com Glassmorphism */}
				<div className="controls-display">
					<h2 className="explorer-title">{title}</h2>
					
					{/* Grid com os 6 botões */}
					<div className="items-grid">
						{items.map((item, index) => (
							<button 
								key={index} 
								className="item-card" 
								data-img={item.imageUrl} // O view.js usa isso para trocar a imagem
							>
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

					{/* Botão de Contato com classes padrão de tema do WordPress */}
					{/* Botão de Contato com classes padrão de tema do WordPress */}
					<div className="contact-action wp-block-buttons">
						<div className="wp-block-button">
							<a 
								href={contactUrl} 
								className="wp-block-button__link wp-element-button"
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
	);
}