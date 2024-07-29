<?php

function start_enqueue_api_scripts()
{
  $authURLs = json_encode([
    'signup' => esc_url_raw(rest_url('start/v1/signup')),
    'signin' => esc_url_raw(rest_url('start/v1/signin'))
  ]);

  wp_add_inline_script(
    'start-auth-modal-script',
    "const start_auth_rest = {$authURLs}",
    'before' // 'after'
  );
}

function start_js_check_scripts()
{
?>
<script>
document.documentElement.className += ' js';
</script>
<?php
}

function start_enqueue_styles()
{
  wp_enqueue_style('start_theme_style', START_THEME_URL . '/assets/css/styles.min.css', array(), START_THEME_VERSION);
}

function start_enqueue_scripts()
{
  wp_enqueue_script('start_theme_script', START_THEME_URL . '/assets/js/index.min.js', array(), START_THEME_VERSION, true);
}
add_action('wp_enqueue_scripts', 'start_enqueue_scripts');