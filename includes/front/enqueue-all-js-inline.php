<?php

/**
 * ⚡ JS INLINE DE EMERGÊNCIA
 * Objetivo: Reduzir requisições HTTP e acelerar o carregamento de scripts essenciais.
 * * 🛑 PERIGO: JavaScript inline ignora o carregamento assíncrono padrão. 
 * Se um script depender de uma biblioteca (como jQuery) que não foi inlinada 
 * antes dele, o site apresentará erros de "ReferenceError".
 * 🛑 RECURSOS: Evite usar em scripts externos (Google Maps, APIs) para não travar o servidor.
 */
function simple_inline_js($html)
{
    // Não executa no painel administrativo ou se o HTML estiver vazio
    if (is_admin() || empty($html)) return $html;

    // Pattern para encontrar tags <script src="...">
    // Ignora scripts que já são inline ou que não têm o atributo src
    $pattern = '/<script[^>]*src=("|\')([^"\']+)("|\')[^>]*><\/script>/i';
    preg_match_all($pattern, $html, $matches);

    foreach ($matches[0] as $index => $full_match) {
        $js_url = $matches[2][$index];

        // Evita inlinear scripts externos pesados (Ex: Google Analytics, Facebook Pixel)
        // Inlinear esses caras pode quebrar o site ou lentificar o servidor
        if (strpos($js_url, get_site_url()) === false) continue;

        // Cache buster para garantir que o servidor pegue o arquivo novo
        $js_url_with_cache = $js_url . (strpos($js_url, '?') !== false ? '&' : '?') . 'v=' . time();

        $response = wp_remote_get($js_url_with_cache, ['timeout' => 5]);

        if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
            $js_content = wp_remote_retrieve_body($response);

            // Cria a tag inline
            $inline_script = '<script type="text/javascript" id="inlined-js-' . $index . '">' . $js_content . '</script>';

            // Substitui a chamada externa pelo conteúdo bruto
            $html = str_replace($full_match, $inline_script, $html);
        }
    }

    return $html;
}

// Ativa o buffer de saída
// add_action('template_redirect', function () {
//     ob_start('simple_inline_js');
// });
