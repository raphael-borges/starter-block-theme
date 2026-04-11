<?php
/**
 * Title: 404
 * Slug: starter-block-theme/404
 * Inserter: no
 */
?>
<!-- wp:template-part {"slug":"header","area":"header"} /-->

<!-- wp:group {"tagName":"main","style":{"dimensions":{"minHeight":"60vh"}},"layout":{"type":"constrained"}} -->
<main class="wp-block-group" style="min-height:60vh"><!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center"><?php esc_html_e('404 - Page not found', 'starter-block-theme');?></h2>
<!-- /wp:heading --></main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","area":"footer"} /-->