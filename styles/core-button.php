<?php

// Example
function start_core_button_register_block_styles()
{
    register_block_style(
        'core/button',
        array(
            'name' => 'primary',
            'label' => __('Primary', wp_get_theme()->get('TextDomain')),
            'inline_style' => file_get_contents(START_THEME_DIR . '/styles/core-button-primary.css'),
        )
    );

    register_block_style(
        'core/button',
        array(
            'name' => 'secondary',
            'label' => __('Secondary', wp_get_theme()->get('TextDomain')),
            'inline_style' => file_get_contents(START_THEME_DIR . '/styles/core-button-secondary.css'),
        )
    );
}

add_action('init', 'start_core_button_register_block_styles');