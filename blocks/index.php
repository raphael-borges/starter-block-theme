<?php

/**
 * Plugin Name:       Starter Blocks
 * Plugin URI:        https://raphaelborges.com.br
 * Description:       A plugin for adding blocks to a theme.
 * Version:           1.0.0
 * Requires at least: 5.9
 * Requires PHP:      7.2
 * Author:            Raphael Borges
 * Author URI:        https://raphaelborges.com.br
 * Text Domain:       starter-block
 * Domain Path:       /languages
 */

if (!function_exists('add_action')) {
  echo 'Seems like you stumbled here by accident. 😛';
  exit;
}

// Setup
define('UP_PLUGIN_DIR', plugin_dir_path(__FILE__));

// Includes
include(UP_PLUGIN_DIR . 'register-blocks.php');

// Hooks
add_action('init', 'up_register_blocks');
