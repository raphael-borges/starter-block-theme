<?php
/**
 * Render do bloco orquestrador: starter-block-theme/spatial-canvas
 *
 * @package StarterBlockTheme
 */

$total_sections = isset( $attributes['totalSections'] ) ? (int) $attributes['totalSections'] : 5;
$auto_advance   = isset( $attributes['autoAdvanceMs'] ) ? (int) $attributes['autoAdvanceMs'] : 8000;
$cta_label      = isset( $attributes['ctaLabel'] ) ? (string) $attributes['ctaLabel'] : __( 'Ver trabalho', 'starter-block-theme' );
$cta_url        = isset( $attributes['ctaUrl'] ) ? (string) $attributes['ctaUrl'] : '#';

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class'             => 'sbt-spatial-canvas',
		'role'              => 'application',
		'aria-label'        => __( 'Navegação espacial da home', 'starter-block-theme' ),
		'data-sbt-canvas'   => '1',
		'data-auto-advance' => (string) $auto_advance,
		'data-cta-url'      => esc_attr( $cta_url ),
	)
);
?>
<div <?php echo $wrapper_attributes; ?>>
	<div class="sbt-spatial-canvas__stage">
		<div class="sbt-spatial-canvas__track">
			<?php echo $content; ?>
		</div>
	</div>
	<div class="sbt-spatial-canvas__hud" role="toolbar" aria-label="<?php esc_attr_e( 'Controles de navegação espacial', 'starter-block-theme' ); ?>">
		<div class="sbt-spatial-canvas__hud-section">
			<span class="sbt-spatial-canvas__hud-index">
				<span data-sbt-current-section>01</span>
				<span class="sbt-spatial-canvas__hud-sep">/</span>
				<span data-sbt-total-sections>05</span>
			</span>
			<span class="sbt-spatial-canvas__hud-title" data-sbt-current-title aria-live="polite">Início</span>
		</div>
		<div class="sbt-spatial-canvas__hud-nav">
			<button type="button" class="sbt-spatial-canvas__nav-btn" data-sbt-prev-slide>←</button>
			<button type="button" class="sbt-spatial-canvas__nav-btn" data-sbt-next-slide>→</button>
		</div>
		<div class="sbt-spatial-canvas__hud-slide">
			<span class="sbt-spatial-canvas__hud-slide-label" data-sbt-slide-label>01 / 01</span>
			<div class="sbt-spatial-canvas__hud-arrows">
				<button type="button" class="sbt-spatial-canvas__nav-btn sbt-spatial-canvas__nav-btn--vertical" data-sbt-prev-section>↑</button>
				<button type="button" class="sbt-spatial-canvas__nav-btn sbt-spatial-canvas__nav-btn--vertical" data-sbt-next-section>↓</button>
			</div>
		</div>
		<div class="sbt-spatial-canvas__hud-cta">
			<button type="button" class="sbt-spatial-canvas__cta" data-sbt-cta><?php echo esc_html( $cta_label ); ?></button>
		</div>
		<div class="sbt-spatial-canvas__hud-progress" aria-hidden="true">
			<div class="sbt-spatial-canvas__hud-progress-fill" data-sbt-progress></div>
		</div>
	</div>
</div>
