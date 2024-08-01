<?php
if (!function_exists('add_action')) {
    echo 'Seems like you stumbled here by accident. 😛';
    exit;
}

// Variables
define('START_THEME_DIR', get_template_directory());
define('START_THEME_URL', get_template_directory_uri());
define('START_THEME_VERSION', wp_get_theme()->get('Version'));

// Includes

$rootFiles = glob(START_THEME_DIR . '/includes/*.php');
$subdirectoryFiles = glob(START_THEME_DIR . '/includes/**/*.php');
$allFiles = array_merge($rootFiles, $subdirectoryFiles);

foreach ($allFiles as $filename) {
    include_once($filename);
}

// Hooks

load_theme_textdomain('starter-block-theme', START_THEME_DIR . '/languages');
add_action('wp_head', 'start_js_check_scripts'); // Check if js is enable - includes/enqueue.php
add_action('wp_enqueue_scripts', 'start_enqueue_scripts');  // Add Scripts Theme - includes/enqueue.php
add_action('wp_enqueue_scripts', 'start_enqueue_styles');  // Add Styles Theme - includes/enqueue.php
// add_action('wp_enqueue_scripts', 'start_enqueue_api_scripts'); // - includes/enqueue.php
add_action('init', 'start_block_init'); //  - blocks/register-blocks.php
add_filter('block_categories_all', 'start_block_categories', 1, 2); // - blocks/register-blocks.php
add_action('rest_api_init', 'start_rest_api_init'); // Api Login - includes/api
add_action('init', 'start_disable_emojis'); // - includes/utlities/disable_emojis.php
add_action('wp_enqueue_scripts', 'start_wpcf7_dequeue_scripts', 99); // Optimize contact-form-7 Enqueue  - includes/utlities/contact-form-7.php

add_filter('render_block', 'start_add_icon_navigation_submenu', 10, 2);
