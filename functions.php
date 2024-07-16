<?php
if (!function_exists('add_action')) {
    echo 'Seems like you stumbled here by accident. 😛';
    exit;
}

// Variables
define('START_THEME_DIR', get_template_directory());

// Includes

$rootFiles = glob(START_THEME_DIR . '/includes/*.php');
$blockFiles = glob(START_THEME_DIR . '/blocks/*.php');
$subdirectoryFiles = glob(START_THEME_DIR . '/includes/**/*.php');
$allFiles = array_merge($rootFiles, $subdirectoryFiles, $blockFiles);

foreach ($allFiles as $filename) {
    include_once($filename);
}

// Hooks
add_action('init', 'start_block_init');
add_action('rest_api_init', 'start_rest_api_init'); // Api Login
add_action('wp_enqueue_scripts', 'start_enqueue_scripts');
add_action('wp_enqueue_scripts', 'start_wpcf7_dequeue_scripts', 99); // Optimize contact-form-7 Enqueue