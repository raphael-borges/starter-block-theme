<?php
/**
 * Title: search
 * Slug: starter-block-theme/search
 * Inserter: no
 */
?>
<!-- wp:template-part {"slug":"header","area":"header"} /-->

<!-- wp:group {"tagName":"header","style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}},"color":{"background":"#f7f7f7"},"shadow":"6px 6px 9px rgba(0, 0, 0, 0.2)"},"layout":{"type":"constrained"}} -->
<header class="wp-block-group has-background" style="background-color:#f7f7f7;padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80);box-shadow:6px 6px 9px rgba(0, 0, 0, 0.2)"><!-- wp:group {"style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"},"margin":{"top":"0","bottom":"0"}}},"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
<div class="wp-block-group" style="margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><!-- wp:group {"style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"},"margin":{"top":"0","bottom":"0"}}},"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group" style="margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><!-- wp:query-title {"type":"search","style":{"elements":{"link":{"color":{"text":"var:preset|color|contrast"}}},"typography":{"fontStyle":"normal","fontWeight":"700"}},"textColor":"contrast"} /--></div>
<!-- /wp:group -->

<!-- wp:search {"label":"<?php esc_attr_e('Pesquisar', 'starter-block-theme');?>","showLabel":false,"placeholder":"<?php esc_attr_e('Buscar no Blog', 'starter-block-theme');?>","width":100,"widthUnit":"%","buttonText":"<?php esc_attr_e('Pesquisar', 'starter-block-theme');?>","buttonUseIcon":true,"style":{"elements":{"link":{"color":{"text":"var:preset|color|contrast"}}}},"textColor":"contrast","borderColor":"contrast"} /--></div>
<!-- /wp:group --></header>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"blockGap":"0","margin":{"top":"0","bottom":"0"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="margin-top:0;margin-bottom:0"><!-- wp:query {"queryId":34,"query":{"perPage":10,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"exclude","inherit":true},"tagName":"main","enhancedPagination":true,"metadata":{"categories":["posts"],"patternName":"core/query-grid-posts","name":"Grid"},"layout":{"type":"constrained"}} -->
<main class="wp-block-query"><!-- wp:post-template {"style":{"border":{"width":"0px","style":"none"},"spacing":{"blockGap":"var:preset|spacing|24"}},"layout":{"type":"grid","columnCount":3,"minimumColumnWidth":null}} -->
<!-- wp:group {"tagName":"article","style":{"spacing":{"padding":{"top":"0","bottom":"var:preset|spacing|16","left":"0","right":"0"},"blockGap":"0"},"border":{"radius":{"topLeft":"24px","topRight":"24px","bottomLeft":"24px","bottomRight":"24px"},"color":"#f7f7f7","width":"1px"},"shadow":"var:preset|shadow|start-default","dimensions":{"minHeight":"100%"}},"backgroundColor":"base","layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch","verticalAlignment":"top","flexWrap":"wrap"}} -->
<article class="wp-block-group has-border-color has-base-background-color has-background" style="border-color:#f7f7f7;border-width:1px;border-top-left-radius:24px;border-top-right-radius:24px;border-bottom-left-radius:24px;border-bottom-right-radius:24px;min-height:100%;padding-top:0;padding-right:0;padding-bottom:var(--wp--preset--spacing--16);padding-left:0;box-shadow:var(--wp--preset--shadow--start-default)"><!-- wp:post-featured-image {"isLink":true,"aspectRatio":"16/9","style":{"border":{"radius":{"topLeft":"24px","topRight":"24px","bottomLeft":"24px","bottomRight":"24px"}},"spacing":{"margin":{"bottom":"var:preset|spacing|16"}}}} /-->

<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|8","padding":{"top":"0","bottom":"0","left":"var:preset|spacing|24","right":"var:preset|spacing|24"}}},"backgroundColor":"branco","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-branco-background-color has-background" style="padding-top:0;padding-right:var(--wp--preset--spacing--24);padding-bottom:0;padding-left:var(--wp--preset--spacing--24)"><!-- wp:categories {"style":{"border":{"radius":{"topLeft":"50px","topRight":"50px","bottomLeft":"50px","bottomRight":"50px"}},"layout":{"selfStretch":"fit","flexSize":null},"elements":{"link":{"color":{"text":"var:preset|color|vivid-purple"}}},"spacing":{"padding":{"top":"var:preset|spacing|16","bottom":"var:preset|spacing|16","left":"0","right":"0"}}},"textColor":"vivid-purple"} /-->

<!-- wp:post-title {"textAlign":"left","isLink":true,"style":{"typography":{"fontSize":"20px","fontStyle":"normal","fontWeight":"700"},"elements":{"link":{"color":{"text":"var:preset|color|contrast"}}}},"textColor":"contrast"} /-->

<!-- wp:post-excerpt {"textAlign":"left","showMoreOnNewLine":false,"excerptLength":26,"style":{"typography":{"fontSize":"0.9em"},"elements":{"link":{"color":{"text":"var:preset|color|azul"}}}},"textColor":"azul"} /-->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|8","bottom":"var:preset|spacing|8","left":"0","right":"0"}}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--8);padding-right:0;padding-bottom:var(--wp--preset--spacing--8);padding-left:0"><!-- wp:post-date {"metadata":{"bindings":{"datetime":{"source":"core/post-data","args":{"field":"date"}}}},"style":{"elements":{"link":{"color":{"text":"var:preset|color|vivid-purple"}}}},"textColor":"vivid-purple"} /-->

<!-- wp:read-more {"content":"<?php esc_attr_e('Leia mais', 'starter-block-theme');?>","style":{"elements":{"link":{"color":{"text":"var:preset|color|branco"}}},"border":{"radius":{"topLeft":"25px","topRight":"25px","bottomLeft":"25px","bottomRight":"25px"}},"spacing":{"padding":{"right":"var:preset|spacing|50","left":"var:preset|spacing|50","top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}},"typography":{"fontStyle":"normal","fontWeight":"700"}},"backgroundColor":"azul-50","textColor":"branco"} /--></div>
<!-- /wp:group --></div>
<!-- /wp:group --></article>
<!-- /wp:group -->
<!-- /wp:post-template -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:query-pagination {"paginationArrow":"chevron","showLabel":false,"layout":{"type":"flex","justifyContent":"center"}} -->
<!-- wp:query-pagination-previous /-->

<!-- wp:query-pagination-numbers /-->

<!-- wp:query-pagination-next /-->
<!-- /wp:query-pagination --></div>
<!-- /wp:group --></main>
<!-- /wp:query --></div>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","area":"footer"} /-->