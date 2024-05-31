<?php
/*
Plugin Name: Gulp Runner
Description: Adiciona um botão ao painel do WordPress para executar tarefas Gulp.
Version: 1.0
Author: Seu Nome
*/

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Adiciona um item de menu ao painel
add_action('admin_menu', 'gulp_runner_menu');

function gulp_runner_menu() {
    add_menu_page('Gulp Runner', 'Gulp Runner', 'manage_options', 'gulp-runner', 'gulp_runner_page');
}

// Exibe a página do plugin
function gulp_runner_page() {
    ?>
    <div class="wrap">
        <h1>Gulp Runner</h1>
        <button id="run-gulp-task" class="button button-primary">Executar Gulp</button>
        <div id="gulp-result"></div>
    </div>
    <script type="text/javascript">
        document.getElementById('run-gulp-task').addEventListener('click', function() {
            document.getElementById('gulp-result').innerHTML = 'Executando...';
            var xhr = new XMLHttpRequest();
            xhr.open('POST', ajaxurl + '?action=run_gulp_task', true);
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 400) {
                    document.getElementById('gulp-result').innerHTML = 'Tarefa executada com sucesso:<br>' + xhr.responseText;
                } else {
                    document.getElementById('gulp-result').innerHTML = 'Erro ao executar a tarefa:<br>' + xhr.responseText;
                }
            };
            xhr.onerror = function () {
                document.getElementById('gulp-result').innerHTML = 'Erro ao executar a tarefa.';
            };
            xhr.send();
        });
    </script>
    <?php
}

// Função para executar a tarefa Gulp
add_action('wp_ajax_run_gulp_task', 'run_gulp_task');

function run_gulp_task() {
    // Caminho para o arquivo gulpfile.js
    $gulpfile_path = get_template_directory() . '/assets/gulpfile.js';
    $gulp_command = 'gulp --gulpfile ' . escapeshellarg($gulpfile_path) . ' default 2>&1';

    // Arquivo temporário para armazenar a saída do comando
    $output_file = tempnam(sys_get_temp_dir(), 'gulp_output');

    // Executa o comando Gulp e captura a saída
    exec($gulp_command . ' > ' . escapeshellarg($output_file) . ' 2>&1', $output, $return_var);

    // Lê a saída do comando a partir do arquivo
    $output_content = file_get_contents($output_file);

    // Remove o arquivo temporário
    unlink($output_file);

    if ($return_var === 0) {
        wp_send_json_success(nl2br(esc_html($output_content)));
    } else {
        wp_send_json_error(nl2br(esc_html($output_content)));
    }
}
?>
