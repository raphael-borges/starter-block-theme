document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(
        ".wp-block-starter-block-theme-dual-vertical-slider .vertical-slider"
    );

    sliders.forEach((slider) => {
        const slides = slider.querySelectorAll(".slide");
        if (slides.length <= 1) return;

        const intervalMs = parseInt(slider.dataset.interval, 10) || 5500;
        let currentIndex = 0;

        setInterval(() => {
            slides[currentIndex].classList.remove("active");
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add("active");
        }, intervalMs);
    });
});