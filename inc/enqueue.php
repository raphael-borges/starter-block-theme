<?php

//  JS Enqueue 

function enqueue_js_theme_scripts()
{

    if (current_user_can('administrator')) {
        // Carrega o arquivo de estilo principal do tema
        wp_enqueue_script('custom-script', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0', true);
    } else {
        // Carrega o arquivo de estilo principal do tema
        wp_enqueue_script('custom-script', get_template_directory_uri() . '/assets/js/src/main.min.js', array(), '1.0', true);
    }
}
add_action('get_footer', 'enqueue_js_theme_scripts');

// CSS Enqueue 

// Function where enqueue 
function enqueue_custom_css($page_slug, $is_critical = false)
{
    if ($is_critical) {
        // If critical style
        $css_path = get_template_directory() . '/assets/css/' . $page_slug . '-critical.css';
      
        if (file_exists($css_path)) {
            $css_content = file_get_contents($css_path);
            echo '<style type="text/css" id="critical-styles-inline-css">' . $css_content . '</style>';
        }
    } else {
        // If NOT critical style
        $css_url = get_template_directory_uri() . '/assets/css/' . $page_slug . '.css';
        $css_path = get_template_directory() . '/assets/css/' . $page_slug . '.css';

        if (file_exists($css_path)) {
            wp_enqueue_style('custom-' . $page_slug, $css_url);
        } else {
            wp_enqueue_style('theme-style', get_template_directory_uri() . '/assets/css/style.css');
        }
    }
}

// function enqueue Css
function theme_style()
{
    if (current_user_can('administrator')) {
        wp_enqueue_style('theme-style', get_template_directory_uri() . '/assets/css/style.css');
    } else {
        if (is_tax()) {
            $page_slug = get_queried_object()->taxonomy;
        } elseif (is_archive() || is_post_type_archive()) {
            $page_slug = get_queried_object()->taxonomy;
        } else {
            $page_slug = get_post_field('post_name');
        }
        enqueue_custom_css($page_slug);
    }
    
}
add_action('wp_footer', 'theme_style');


function hook_critical_css()
{
    if (is_tax()) {
        $page_slug = get_queried_object()->taxonomy;
    } elseif (is_archive() || is_post_type_archive()) {
        $page_slug = get_queried_object()->taxonomy ;
    } elseif (is_home()) {
        $page_slug = get_post_field('post_name');
    } elseif (is_single()) {
        $page_slug = get_post_type() ;
    } else {
        $page_slug = get_post_field('post_name');
    }
    enqueue_custom_css($page_slug, true);
}
add_action('wp_head', 'hook_critical_css');


/**
 * Disable the emoji's
 */
function disable_emojis()
{
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');

    // Remove from TinyMCE
    add_filter('tiny_mce_plugins', 'disable_emojis_tinymce');
}
add_action('init', 'disable_emojis');

/**
 * Filter out the tinymce emoji plugin.
 */
function disable_emojis_tinymce($plugins)
{
    if (is_array($plugins)) {
        return array_diff($plugins, array('wpemoji'));
    } else {
        return array();
    }
}


// function remove_block_library_style()
// {
//     wp_dequeue_style('wp-block-library'); // Remove o estilo da biblioteca de blocos
// }
// add_action('wp_enqueue_scripts', 'remove_block_library_style', 100);
// remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
// remove_action('wp_footer', 'wp_enqueue_global_styles', 1);

