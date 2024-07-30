<?php
// Example
$cssFile = './example.css';

register_block_style(
    'core/list-item',
    array(
        'name' => 'checkicon',
        'label' => __('Check', wp_get_theme()->get('TextDomain')),
        'inline_style' => $cssFile,
    )
);
