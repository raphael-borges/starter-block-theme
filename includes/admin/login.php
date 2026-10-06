<?php

function custom_login_css()
{
    echo '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap">';
    echo '<style type="text/css">
    /* Reset & Base */
    body.login {
        background-color: #f7f1ff;
        font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #2e2e50;
        align-content: center;
    }

    /* Container Principal */
    #login {
        padding: 2rem 1rem;
    }

    /* Logo no Login */
    .login h1 a{
        background-image: url(' . get_template_directory_uri() . '/assets/icons/logo.svg);
        background-size: contain;
        width: 100%;
        max-width: 200px;
    }

    /* Card (Formulário) */
    .login form {
        background-color: #ffffff;
        border: 1px solid rgba(26, 26, 54, 0.12);
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
        padding: 2rem;
    }

    /* Rótulos de Formulário (Labels) */
    .login label {
        font-family: "Poppins", sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        color: #1a1a36 !important;
    }

    /* Campos de Entrada (Inputs) */
    .login input[type="text"],
    .login input[type="password"],
    .login input[type="email"] {
        border-radius: 6px;
        border: 1px solid rgba(26, 26, 54, 0.12);
        background-color: #ffffff;
        color: #1a1a36;
        box-shadow: none;
        padding: 0.5rem 0.75rem;
        font-family: inherit;
        font-size: 0.875rem;
    }

    .login input[type="text"]:focus,
    .login input[type="password"]:focus,
    .login input[type="email"]:focus {
        border-color: #1a1a36;
        box-shadow: 0 0 0 2px rgba(26, 26, 54, 0.15);
    }

    /* Botão "Ver Senha" (Ícone dentro do input no WP) */
    .login .button.wp-hide-pw {
        color: #6e6e88;
    }

    .login .button.wp-hide-pw:hover,
    .login .button.wp-hide-pw:focus {
        color: #1a1a36;
        box-shadow: none;
    }

    /* Checkbox "Lembrar-me" */
    .login input[type="checkbox"] {
        border-radius: 4px;
        border: 1px solid rgba(26, 26, 54, 0.25);
    }

    .login input[type="checkbox"]:checked {
        background-color: #965ca2;
        border-color: #965ca2;
    }

    .login input[type="checkbox"]:focus {
        border-color: #1a1a36;
        box-shadow: 0 0 0 2px rgba(26, 26, 54, 0.15);
    }

    .login .forgetmenot label {
        color: #2e2e50 !important;
        font-weight: 400;
        font-size: 0.875rem;
    }

    /* Botão Principal */
    .wp-core-ui .button-primary {
        background-color: #965ca2 !important;
        border: none !important;
        border-radius: 6px !important;
        color: #ffffff !important;
        font-family: "Poppins", sans-serif !important;
        font-weight: 500 !important;
        box-shadow: none !important;
        text-shadow: none !important;
        transition: background-color 0.15s ease, transform 0.05s ease;
        height: 40px;
        line-height: 38px;
        padding: 0 1rem;
    }

    .wp-core-ui .button-primary:hover,
    .wp-core-ui .button-primary:focus {
        background-color: #854f91 !important;
        color: #ffffff !important;
    }

    .wp-core-ui .button-primary:active {
        transform: scale(0.99);
    }

    .wp-core-ui .button-primary:disabled {
        opacity: 0.6 !important;
        cursor: not-allowed;
    }

    /* Seletor de Idioma (Nativo WP + WPML) */
    .language-switcher,
    .wpml-login-ls {
        margin-top: 1.5rem;
        text-align: center;
    }

    .language-switcher label,
    .wpml-login-ls label {
        color: #6e6e88 !important;
        font-size: 0.875rem;
    }

    .wpml-login-ls .dashicons-translation {
        color: #6e6e88;
        vertical-align: middle;
        margin-right: 0.25rem;
    }

    .language-switcher select,
    .wpml-login-ls select {
        border-radius: 6px;
        border: 1px solid rgba(26, 26, 54, 0.12);
        background-color: #ffffff;
        color: #1a1a36;
        font-family: "Poppins", sans-serif;
        font-size: 0.875rem;
        padding: 0.35rem 0.75rem;
        box-shadow: none;
    }

    .language-switcher select:focus,
    .wpml-login-ls select:focus {
        border-color: #1a1a36;
        box-shadow: 0 0 0 2px rgba(26, 26, 54, 0.15);
    }

    .language-switcher .button,
    .wpml-login-ls .button {
        background-color: #ffffff;
        border: 1px solid rgba(26, 26, 54, 0.12);
        border-radius: 6px;
        color: #1a1a36;
        font-family: "Poppins", sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        box-shadow: none;
        transition: border-color 0.15s ease;
    }

    .language-switcher .button:hover,
    .language-switcher .button:focus,
    .wpml-login-ls .button:hover,
    .wpml-login-ls .button:focus {
        border-color: #1a1a36;
        color: #1a1a36;
        background-color: #ffffff;
    }

    /* Mensagens de Alerta, Informação e Erro */
    .login .message,
    .login #login_error,
    .login .notice,
    #login-message {
        border-radius: 6px;
        font-family: "Poppins", sans-serif;
        font-size: 0.875rem;
        box-shadow: none;
    }

    .login #login_error {
        background-color: #fef2f2;
        border-left: 4px solid #dc2626;
        color: #dc2626;
    }

    .login .message,
    .login .notice-info,
    #login-message {
        border-left: 4px solid #965ca2;
        color: #2e2e50;
    }

    /* Links de Apoio (Esqueceu a senha / Voltar ao blog) */
    .login #backtoblog,
    .login #nav {
        text-align: center;
        padding: 0.5rem 0 0 0;
    }

    .login #backtoblog a, 
    .login #nav a {
        color: #965ca2 !important;
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-size: 0.875rem;
        text-decoration: none;
        transition: color 0.15s ease;
    }

    .login #backtoblog a:hover, 
    .login #nav a:hover, 
    .login #backtoblog a:focus, 
    .login #nav a:focus {
        color: #854f91 !important;
        text-decoration: underline;
    }
    </style>';
}
add_action('login_head', 'custom_login_css');
