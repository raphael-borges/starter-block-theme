<?php
function remove_enqueued_scripts_and_styles()
{
    // Desenfileira todos os scripts
    wp_dequeue_style('wp-block-library'); // Remove o estilo da biblioteca de blocos
    remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
    wp_dequeue_script('wp-block-template-skip-link');

    // Desenfileira todos os estilos
    wp_dequeue_style('wp-block-site-logo');
    wp_dequeue_style('wp-block-site-logo-theme');
    wp_dequeue_style('wp-block-navigation-link');
    wp_dequeue_style('wp-block-navigation-link-theme');
    wp_dequeue_style('wp-block-navigation');
    wp_dequeue_style('wp-block-navigation-theme');
    wp_dequeue_style('wp-block-group');
    wp_dequeue_style('wp-block-group-theme');
    wp_dequeue_style('wp-block-template-part');
    wp_dequeue_style('wp-block-template-part-theme');
    wp_dequeue_style('wp-block-heading');
    wp_dequeue_style('wp-block-heading-theme');
    wp_dequeue_style('wp-block-paragraph');
    wp_dequeue_style('wp-block-paragraph-theme');
    wp_dequeue_style('wp-block-spacer');
    wp_dequeue_style('wp-block-spacer-theme');
    wp_dequeue_style('wp-block-button');
    wp_dequeue_style('wp-block-button-theme');
    wp_dequeue_style('wp-block-buttons');
    wp_dequeue_style('wp-block-buttons-theme');
    wp_dequeue_style('wp-block-column');
    wp_dequeue_style('wp-block-column-theme');
    wp_dequeue_style('wp-block-image');
    wp_dequeue_style('wp-block-image-theme');
    wp_dequeue_style('wp-block-columns');
    wp_dequeue_style('wp-block-columns-theme');
    wp_dequeue_style('wp-block-separator');
    wp_dequeue_style('wp-block-separator-theme');
    wp_dequeue_style('wp-block-list-item');
    wp_dequeue_style('wp-block-list-item-theme');
    wp_dequeue_style('wp-block-list');
    wp_dequeue_style('wp-block-list-theme');
    wp_dequeue_style('wp-block-block');
    wp_dequeue_style('wp-block-block-theme');
    wp_dequeue_style('wp-block-table');
    wp_dequeue_style('wp-block-table-theme');
    wp_dequeue_style('wp-block-post-content');
    wp_dequeue_style('wp-block-post-content-theme');
    wp_dequeue_style('wp-block-latest-posts');
    wp_dequeue_style('wp-block-latest-posts-theme');
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('core-block-supports');
    wp_dequeue_style('wp-block-template-skip-link');
    wp_dequeue_style('global-styles');
}

// Function where enqueue 
function enqueue_custom_css($page_slug, $is_critical = false)
{
    if ($is_critical) {
        // If critical style
        $css_path = get_template_directory() . '/assets/css/critical/' . $page_slug . '.css';

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

function hook_critical_css()
{
    if (is_tax()) {
        $page_slug = get_queried_object()->slug;
    } elseif (is_archive() || is_post_type_archive()) {
        $page_slug = get_queried_object()->slug;
    } elseif (is_home()) {
        $page_slug = get_post_field('post_name');
    } elseif (is_single()) {
        $page_slug = get_post_type();
    } else {
        $page_slug = get_post_field('post_name');
    }
    enqueue_custom_css($page_slug, true);
}

if (current_user_can('administrator')) {
    // Se o usuário for administrador, não faz nada
} else {
        // Adiciona a função para ser chamada no hook 'wp_head'
        add_action('wp_head', 'hook_critical_css');

        // Adiciona a função para ser chamada no hook 'wp_enqueue_scripts'
        add_action('wp_enqueue_scripts', 'remove_enqueued_scripts_and_styles', 9999);
}

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

// Enqueue the editor styles.
function mytheme_block_editor_styles()
{
    // Enqueue the editor styles.
    add_theme_support('editor-styles');
    add_editor_style(get_template_directory_uri() . '/assets/css/style.css');
}
add_action('after_setup_theme', 'mytheme_block_editor_styles');


// function example_enqueue_block_variations()
// {
//     wp_enqueue_script(
//         'frost-enqueue-block-variations',
//         get_template_directory_uri() . '/assets/js/variations.js',
//         array('wp-blocks', 'wp-dom-ready', 'wp-edit-post')
//     );
// }
// add_action('enqueue_block_editor_assets', 'example_enqueue_block_variations');



// Otimize contact-form-7 Enqueue
function dd_wpcf7_dequeue_scripts()
{

    $load_scripts = false;

    if (is_singular()) {
        $post = get_post();

        if (has_shortcode($post->post_content, 'contact-form-7')) {
            $load_scripts = true;
        }
    }

    if (!$load_scripts) {
        wp_dequeue_script('contact-form-7');
        wp_dequeue_script('google-recaptcha');
        wp_dequeue_style('contact-form-7');
    }
}
add_action('wp_enqueue_scripts', 'dd_wpcf7_dequeue_scripts', 99);


// Remove wp-polyfill
function deregister_polyfill()
{
    wp_deregister_script('wp-polyfill');
    wp_deregister_script('regenerator-runtime');
}
add_action('wp_enqueue_scripts', 'deregister_polyfill');
