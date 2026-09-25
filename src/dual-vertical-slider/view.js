document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(
        ".wp-block-starter-block-theme-dual-vertical-slider .vertical-slider"
    );

    sliders.forEach((slider) => {
        const track = slider.querySelector(".slider-track") || slider;

        const slides = Array.from(track.children).filter((child) =>
            child.classList.contains("slide")
        );

        if (slides.length <= 1) return;

        // Força a decodificação imediata da imagem escolhida pelo <picture>
        slides.forEach((slide) => {
            const img = slide.tagName === "IMG" ? slide : slide.querySelector("img");
            if (img) {
                img.loading = "eager";
                img.decoding = "sync";
            }
        });

        const intervalMs = parseInt(slider.dataset.interval, 10) || 5500;

        let currentIndex = slides.findIndex((slide) =>
            slide.classList.contains("active")
        );
        if (currentIndex === -1) currentIndex = 0;

        setInterval(() => {
            slides[currentIndex].classList.remove("active");
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add("active");
        }, intervalMs);
    });
});