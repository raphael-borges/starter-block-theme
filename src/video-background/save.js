import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
    const { video1080, video720, video480, videoSize } = attributes;

    return (
        <div {...useBlockProps.save({ className: `has-video-size-${videoSize}` })}>
            <video autoPlay muted loop playsInline className="bg-video">
                {/* Ordem de prioridade: O navegador testa de cima para baixo */}
                
                {/* Se a tela tiver pelo menos 1025px (Desktop) */}
                {video1080 && (
                    <source src={video1080} type="video/mp4" media="(min-width: 1025px)" />
                )}

                {/* Se a tela tiver entre 601px e 1024px (Tablet) */}
                {video720 && (
                    <source src={video720} type="video/mp4" media="(min-width: 601px)" />
                )}

                {/* Mobile: Se nada acima servir ou se a tela for menor que 600px */}
                {video480 && (
                    <source src={video480} type="video/mp4" />
                )}
            </video>
            
            <div className="block-content">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}