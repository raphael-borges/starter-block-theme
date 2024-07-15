<?php
if (!function_exists('add_action')) {
    echo 'Seems like you stumbled here by accident. 😛';
    exit;
}

// Variables
define('UP_PLUGIN_DIR', plugin_dir_path(__FILE__));

// Includes
$rootFiles = glob(UP_PLUGIN_DIR . 'includes/*.php');
$subdirectoryFiles = glob(UP_PLUGIN_DIR . 'includes/**/*.php');
$allFiles = array_merge($rootFiles, $subdirectoryFiles);

// Hooks
add_action('init', 'up_register_blocks');
add_action('rest_api_init', 'up_rest_api_init');
