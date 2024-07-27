<?php

function start_enqueue_scripts()
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
