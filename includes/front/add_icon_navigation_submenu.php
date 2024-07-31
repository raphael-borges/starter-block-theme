<?php
function start_add_icon_navigation_submenu($block_content, $block)
{
    // Verifica se o bloco é o core/navigation-submenu
    if (isset($block['blockName']) && $block['blockName'] === 'starter-block-theme/nav-theme') {
        // Adiciona um "+" antes do conteúdo do submenu
        $search = '<li class=" wp-block-navigation-item has-child current-menu-item wp-block-navigation-submenu">';

        $replace = '<li class="wp-block-navigation-item has-child current-menu-item wp-block-navigation-submenu"> <button class="submenu-plus" aria-expanded="false" aria-label="' .  esc_html__("Open Submenu", "starter-block-theme") . '">˅</button>';

        $block_content = str_replace($search, $replace, $block_content);
    }

    return $block_content;
}
