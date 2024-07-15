<?php

add_action('after_setup_theme', 'theme_slug_setup');

// Variables
define('UP_PLUGIN_DIR', plugin_dir_path(__FILE__));

// Includes
$rootFiles = glob(UP_PLUGIN_DIR . 'includes/*.php');
$subdirectoryFiles = glob(UP_PLUGIN_DIR . 'includes/**/*.php');
$allFiles = array_merge($rootFiles, $subdirectoryFiles);

// Hooks