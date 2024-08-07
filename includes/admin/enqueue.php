<?php

function start_enqueue_editor_styles()
{

    if (is_admin()) {
        // Register the editor stylesheet located in the theme's root directory.
        wp_register_style(
            'start-block-editor-styles',
            get_theme_file_uri('assets/css/editor-styles.min.css'),
            [],
            START_THEME_VERSION
        );

        // Enqueue editor styles.
        wp_enqueue_style('start-block-editor-styles');
    }
}