<?php
// Example
$cssFile = './example.css';

register_block_style(
    'core/list-item',
    array(
        'name' => 'checkicon',
        'label' => __('Check', 'lojadacriacao'),
        'inline_style' => $cssFile,
    )
);
