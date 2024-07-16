<?php
// Optimize contact-form-7 Enqueue
function start_wpcf7_dequeue_scripts()
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
