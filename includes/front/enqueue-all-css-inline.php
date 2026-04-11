<?php

/**
 * 🎨 CSS INLINE DE EMERGÊNCIA
 * Objetivo: Eliminar arquivos que bloqueiam a renderização inicial (Render-blocking CSS).
 * * ⚠️ ATENÇÃO: Se o CSS for muito grande, o HTML ficará pesado e prejudicará o SEO.
 * ⚠️ CUIDADO: Caminhos relativos dentro do CSS (ex: url(../fonts/)) podem quebrar, 
 * pois a base de referência passa a ser a URL da página e não o diretório do tema.
 */
function simple_inline_css($html)
{
    if (is_admin() || empty($html)) return $html;

    $pattern = '/<link[^>]*rel=("|\')stylesheet("|\')[^>]*href=("|\')([^"\']+)("|\')[^>]*>/i';
    preg_match_all($pattern, $html, $matches);

    foreach ($matches[0] as $index => $full_match) {
        $css_url = $matches[4][$index];

        // ADICIONAR PARÂMETRO PARA QUEBRAR CACHE
        $cache_buster = '?ver=' . time(); // ou filemtime se possível
        $css_url_with_cache = $css_url . $cache_buster;

        $response = wp_remote_get($css_url_with_cache);

        if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
            $css_content = wp_remote_retrieve_body($response);
            $inline_style = '<style type="text/css">' . $css_content . '</style>';
            $html = str_replace($full_match, $inline_style, $html);
        }
    }

    return $html;
}

// add_action('template_redirect', function () {
//     ob_start('simple_inline_css');
// });
