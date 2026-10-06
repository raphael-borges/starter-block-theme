<?php
/**
 * Render do bloco de sessão do Canvas Espacial 2D. [DEBUG ATIVO]
 *
 * @package StarterBlockTheme
 */

$section_title = isset( $attributes['sectionTitle'] ) ? (string) $attributes['sectionTitle'] : '';
$slide_count   = isset( $attributes['slideCount'] ) ? (int) $attributes['slideCount'] : 1;
$section_num   = isset( $attributes['sectionNumber'] ) ? (string) $attributes['sectionNumber'] : '';

/* ============ DEBUG ============ */
if ( current_user_can( 'manage_options' ) ) {
	echo "\n<!-- === SBT DEBUG === -->\n";
	echo "<!-- typeof(content): " . gettype( $content ) . " -->\n";
	echo "<!-- strlen(content): " . strlen( (string) $content ) . " -->\n";
	echo "<!-- trim(content): [" . esc_html( trim( (string) $content ) ) . "] -->\n";
	echo "<!-- raw(content): " . esc_html( substr( (string) $content, 0, 300 ) ) . " -->\n";
	echo "<!-- === /SBT DEBUG === -->\n\n";
}
/* ========== /DEBUG =========== */

$has_content = '' !== trim( (string) $content );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class'                   => 'sbt-section',
		'data-sbt-section'        => '1',
		'data-sbt-section-title'  => esc_attr( $section_title ),
		'data-sbt-section-slides' => esc_attr( (string) $slide_count ),
		'id'                      => 'sessao-' . $section_num,
		'data-sbt-has-content'    => $has_content ? '1' : '0',
	)
);
?>
<div <?php echo $wrapper_attributes; ?>>
	<div class="sbt-section__inner">
		<?php if ( $has_content ) : ?>
			<div class="sbt-section__content">
				<?php echo $content; ?>
			</div>
		<?php else : ?>
			<div class="sbt-section__placeholder" aria-hidden="true">
				<?php if ( $section_num ) : ?>
					<span class="sbt-section__number"><?php echo esc_html( $section_num ); ?></span>
				<?php endif; ?>
				<?php if ( $section_title ) : ?>
					<span class="sbt-section__title"><?php echo esc_html( $section_title ); ?></span>
				<?php endif; ?>
				<span class="sbt-section__caption">
					<?php esc_html_e( 'Sessão dummy — aguardando layout', 'starter-block-theme' ); ?>
				</span>
			</div>
		<?php endif; ?>
	</div>
</div>
