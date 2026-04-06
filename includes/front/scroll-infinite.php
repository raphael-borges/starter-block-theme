<?php

function blog_infinite_scroll()
{
    // Só carrega o script se estivermos no blog ou arquivos
    if (is_home() || is_archive() || is_search()) {
?>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                let loading = false;

                window.addEventListener('scroll', function() {
                    const paginationNext = document.querySelector('.wp-block-query-pagination-next');

                    if (paginationNext && !loading) {
                        const rect = paginationNext.getBoundingClientRect();
                        // Se o botão estiver a 200px de aparecer na tela
                        if (rect.top <= window.innerHeight + 200) {
                            loadMorePosts(paginationNext);
                        }
                    }
                });

                function loadMorePosts(nextLink) {
                    loading = true;
                    const nextUrl = nextLink.href;

                    // Feedback visual usando seu azul #52A6E5 (via CSS)
                    nextLink.innerText = 'Carregando mais posts...';

                    fetch(nextUrl)
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');

                            const newPosts = doc.querySelectorAll('.wp-block-post');
                            const container = document.querySelector('.wp-block-post-template');
                            const newPagination = doc.querySelector('.wp-block-query-pagination-next');

                            if (newPosts.length > 0 && container) {
                                newPosts.forEach(post => {
                                    // Animação simples de fade-in ao entrar
                                    post.style.opacity = '0';
                                    container.appendChild(post);
                                    setTimeout(() => post.style.opacity = '1', 10);
                                });
                            }

                            if (newPagination) {
                                nextLink.href = newPagination.href;
                                nextLink.innerText = 'Ver mais';
                            } else {
                                nextLink.remove(); // Remove o botão se não houver mais páginas
                            }
                            loading = false;
                        })
                        .catch(err => {
                            console.error('Erro ao carregar posts:', err);
                            loading = false;
                        });
                }
            });
        </script>
        <style>
            /* Garantindo a transição suave dos novos posts */
            .wp-block-post {
                transition: opacity 0.5s ease-in-out;
            }

            /* Esconde os números da paginação se o scroll infinito estiver ativo */
            .wp-block-query-pagination-numbers {
                display: none !important;
            }
        </style>
<?php
    }
}
add_action('wp_footer', 'blog_infinite_scroll');