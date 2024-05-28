<?php 

function custom_login_css()
{
    echo
    '<style style="text/css">
    body {
        background: #191836;
    }
    .login #backtoblog a:hover, .login #nav a:hover, .login h1 a:hover, .login #backtoblog a:focus, .login #nav a:focus, .login h1 a:focus {
        color: #f59c00;
    }
    .login #backtoblog a, .login #nav a {
        text-decoration: none;
        color: #fff;
    }
    .login h1 a {
        background-image: none, url(' . get_template_directory_uri() . '/assets/images/icons/logo.svg);
        background-size: contain;
    }
    .login form{
        transition: opacity .5s ease, color .5s ease, transform .5s ease;
        background: radial-gradient(115.95% 115.95% at 83.75% 13.75%, rgba(4, 0, 31, 0) 51.04%, rgba(4, 0, 31, .7) 100%), #191836;
        border: 1px solid #29284a;
        box-shadow: 4px 4px 9px 1px rgba(4, 0, 31, .5);
        border-radius: 7px;
        padding: 45px 25px 30px 25px;
        position: relative;
    }
    .wp-core-ui .button-primary{
            color: #191836;
            background-color: #f59c00;
            border: 0;
            border-radius: 50px;
            font-weight: 700;
            cursor: pointer;
            transition: all .5s ease-out;
        }
        .wp-core-ui .button-primary.focus, .wp-core-ui .button-primary.hover, .wp-core-ui .button-primary:focus, .wp-core-ui .button-primary:hover{
            
            color: #191836;
            background-color: #f59c00;
            opacity: 0.5;
        }
        .login .forgetmenot label, .login .pw-weak label, form label  {
            color: #fff;
        }
        
    </style>';
}
add_action('login_head', 'custom_login_css');