<?php

add_action('after_setup_theme', 'theme_slug_setup');

function theme_slug_setup()
{
    add_theme_support('wp-block-styles');
}

// FUNÇÔES
require_once get_template_directory() . '/inc/enqueue.php'; //Adicionar critical
require_once get_template_directory() . '/inc/login.php'; //Customização de Login
require_once get_template_directory() . '/inc/styles.php'; //Styles block


function my_theme_load_theme_textdomain()
{
    load_theme_textdomain('starter-theme', get_template_directory() . '/languages');
}
add_action('after_setup_theme', 'my_theme_load_theme_textdomain');


