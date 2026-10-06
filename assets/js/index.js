// import debounce from "./utilities/debounce";

// const myCallback = () => {
// 	console.log("Debounced function executed!");
// };

// // Usando debounce com um delay de 300ms
// const debouncedFunction = debounce(myCallback, 300);

// // Chame a função debounced quando necessário
// debouncedFunction();




document.addEventListener('DOMContentLoaded', () => {
    const wpBlocks = document.querySelectorAll('[class*="wp-block-"]');
    if (!wpBlocks.length) return;

    const windowHeight = window.innerHeight;

    // Filtra blocos abaixo da dobra E ignora qualquer bloco dentro do footer
    const belowTheFoldBlocks = Array.from(wpBlocks).filter(block => {
        // Ignora se o elemento estiver dentro da tag <footer> ou da classe .site-footer
        if (block.closest('footer, .site-footer, #colophon')) return false;

        const rect = block.getBoundingClientRect();
        return rect.top >= windowHeight;
    });

    if (!belowTheFoldBlocks.length) return;

    // Prepara apenas os blocos identificados abaixo da dobra
    belowTheFoldBlocks.forEach(block => block.classList.add('reveal-on-scroll'));

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    belowTheFoldBlocks.forEach(block => observer.observe(block));
});