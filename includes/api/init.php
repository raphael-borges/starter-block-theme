<?php

function start_rest_api_init()
{
  // example.com/wp-json/start/v1/signup
  register_rest_route('start/v1', '/signup', [
    'methods' => WP_REST_Server::CREATABLE,
    'callback' => 'start_rest_api_signup_handler',
    'permission_callback' => '__return_true'
  ]);

  register_rest_route('start/v1', '/signin', [
    'methods' => WP_REST_Server::EDITABLE,
    'callback' => 'start_rest_api_signin_handler',
    'permission_callback' => '__return_true'
  ]);
}
