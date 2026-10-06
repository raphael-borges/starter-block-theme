/**
 * Canvas Espacial 2D — modo scroll-driven com JS pinning.
 * O scroll da página dirige a transição entre seções.
 * Rolando devagar, a transição acompanha; parando, ela congela.
 */
(function () {
    "use strict";

    var WHEEL_THRESHOLD = 8;
    var TOUCH_MIN_PX = 40;
    var NAV_DEBOUNCE_MS = 220;

    function padTwo(n) { return String(n).padStart(2, "0"); }

    function isEditable(el) {
        if (!el || !el.tagName) return false;
        var tag = el.tagName.toLowerCase();
        if (tag === "input" || tag === "textarea" || tag === "select") return true;
        if (el.isContentEditable) return true;
        return false;
    }

    function SpatialCanvas(root) {
        if (!root || root.dataset.sbtInit === "1") return;
        root.dataset.sbtInit = "1";

        /* ---------- ESTADO ---------- */
        var currentSection = 0;
        var currentSlide = 0;
        var totalSections = 1;
        var sectionTitles = [];
        var slidesPerSection = [];
        var lastNavTime = 0;
        var touchStartX = 0;
        var touchStartY = 0;
        var rafPending = false;

        /* ---------- DOM ---------- */
        var stage = root.querySelector(".sbt-spatial-canvas__stage");
        var track = root.querySelector(".sbt-spatial-canvas__track");
        var elCurrentSection = root.querySelector("[data-sbt-current-section]");
        var elTotalSections = root.querySelector("[data-sbt-total-sections]");
        var elCurrentTitle = root.querySelector("[data-sbt-current-title]");
        var elSlideLabel = root.querySelector("[data-sbt-slide-label]");
        var elProgress = root.querySelector("[data-sbt-progress]");
        var btnPrevSection = root.querySelector("[data-sbt-prev-section]");
        var btnNextSection = root.querySelector("[data-sbt-next-section]");
        var btnPrevSlide = root.querySelector("[data-sbt-prev-slide]");
        var btnNextSlide = root.querySelector("[data-sbt-next-slide]");
        var btnCta = root.querySelector("[data-sbt-cta]");
        var hud = root.querySelector(".sbt-spatial-canvas__hud");
        var slideNav = root.querySelector(".sbt-spatial-canvas__hud-slide");

        /* ---------- SESSÕES ---------- */
        var sectionEls = root.querySelectorAll("[data-sbt-section]");
        totalSections = sectionEls.length || 1;

        sectionEls.forEach(function (el, idx) {
            sectionTitles[idx] = el.dataset.sbtSectionTitle || "Sessão " + (idx + 1);
            var n = parseInt(el.dataset.sbtSectionSlides || "1", 10);
            slidesPerSection[idx] = isFinite(n) && n > 0 ? n : 1;
        });

        if (!slidesPerSection.length) slidesPerSection = [1];

        root.style.setProperty("--sbt-sections", String(totalSections));

        /* ============================================================
         * HUD CONTEXTUAL
         * ============================================================ */
        function syncHudContext() {
            var el = sectionEls[currentSection];
            if (!el) return;

            var ctaLabel = el.dataset.sbtHudCtaLabel || "";
            var ctaUrl = el.dataset.sbtHudCtaUrl || "";

            if (btnCta) {
                if (ctaLabel) btnCta.textContent = ctaLabel;
                btnCta.hidden = el.dataset.sbtHudHideCta === "1";
            }
            if (slideNav) slideNav.hidden = el.dataset.sbtHudHideSlideNav === "1";
            if (ctaUrl) root.dataset.ctaUrl = ctaUrl;
        }

        function render() {
            if (elCurrentSection) elCurrentSection.textContent = padTwo(currentSection + 1);
            if (elTotalSections) elTotalSections.textContent = padTwo(totalSections);
            if (elCurrentTitle) elCurrentTitle.textContent = sectionTitles[currentSection] || "";

            var totalSlides = slidesPerSection[currentSection] || 1;
            if (elSlideLabel) elSlideLabel.textContent = padTwo(currentSlide + 1) + " / " + padTwo(totalSlides);

            if (btnPrevSection) btnPrevSection.disabled = currentSection === 0;
            if (btnNextSection) btnNextSection.disabled = currentSection >= totalSections - 1;
            if (btnPrevSlide) btnPrevSlide.disabled = currentSlide === 0;
            if (btnNextSlide) btnNextSlide.disabled = currentSlide >= totalSlides - 1;

            syncHudContext();
        }

        /* ============================================================
         * PINNING — mantém o stage preso no topo durante o scroll
         * ============================================================ */
        function pinStage() {
            var rect = root.getBoundingClientRect();
            var vh = window.innerHeight;
            var scrolled = -rect.top;
            var range = rect.height - vh;

            if (scrolled <= 0) {
                stage.style.position = "absolute";
                stage.style.top = "0";
            } else if (scrolled >= range) {
                stage.style.position = "absolute";
                stage.style.top = range + "px";
            } else {
                stage.style.position = "fixed";
                stage.style.top = "0";
                stage.style.left = root.getBoundingClientRect().left + "px";
                stage.style.width = rect.width + "px";
            }
        }

        /* ============================================================
         * UPDATE — calcula transform de cada seção baseado no scroll
         * ============================================================ */
        function update() {
            var vh = window.innerHeight;
            var idealHeight = totalSections * vh;
            var range = idealHeight - vh;
            if (range <= 0) return;

            var rect = root.getBoundingClientRect();
            var scrolled = -rect.top;
            var progress = Math.max(0, Math.min(1, scrolled / range));
            var floatPos = progress * (totalSections - 1);

            sectionEls.forEach(function (el, i) {
                var d = i - floatPos;
                var y, scale, opacity, z, rotateX;

                if (d > 1) {
                    /* -------- 1. Muito abaixo — esperando a vez -------- */
                    y = 100; scale = 1; opacity = 1; z = 1; rotateX = 0;

                } else if (d >= 0) {
                    /* -------- 2. Entrando de baixo -------- */
                    y = d * 100; scale = 1; opacity = 1; z = 10; rotateX = 0;

                } else if (d >= -1) {
                    /* -------- 3. Saindo — arco para cima + encolhe + some --------
                     *   t:      0 → 1 (progresso da saída)
                     *   ease:   t² dá sensação de aceleração (arco/círculo)
                     *   y:      sobe até -70% da altura
                     *   scale:  encolhe até 45%
                     *   rotateX: inclina 30° (profundidade 3D)
                     *   opacity: some progressivamente (um pouco mais rápido no fim)
                     */
                    var t = -d;
                    var ease = t * t;

                    y = -ease * 70;
                    scale = 1 - ease * 0.55;
                    opacity = Math.max(0, 1 - t * 1.4);
                    rotateX = ease * 30;
                    z = 2;

                } else {
                    /* -------- 4. Muito acima — já saiu -------- */
                    y = -70; scale = 0.45; opacity = 0; z = 1; rotateX = 30;
                }

                el.style.transform =
                    "translate3d(0, " + y + "%, 0) " +
                    "scale(" + scale + ") " +
                    "rotateX(" + rotateX + "deg)";
                el.style.opacity = opacity;
                el.style.zIndex = z;
            });

            var active = Math.round(floatPos);
            if (active !== currentSection && active >= 0 && active < totalSections) {
                currentSection = active;
                render();
            }

            if (elProgress) elProgress.style.width = (progress * 100) + "%";
        }
        function scheduleUpdate() {
            if (rafPending) return;
            rafPending = true;
            requestAnimationFrame(function () {
                rafPending = false;
                pinStage();
                update();
            });
        }

        /* ============================================================
         * SCROLL TO SECTION — usando posição real no documento
         * ============================================================ */
        function scrollToSection(i) {
            i = Math.max(0, Math.min(totalSections - 1, i));
            var vh = window.innerHeight;
            var rect = root.getBoundingClientRect();
            var rootTop = rect.top + window.scrollY;
            var targetY = rootTop + i * vh;
            window.scrollTo({ top: targetY, behavior: "smooth" });
        }

        /* ============================================================
         * SLIDES (navegação horizontal)
         * ============================================================ */
        function canNavigate() {
            var now = performance.now();
            if (now - lastNavTime < NAV_DEBOUNCE_MS) return false;
            lastNavTime = now;
            return true;
        }

        function goToSlide(target) {
            var total = slidesPerSection[currentSection] || 1;
            var next = Math.max(0, Math.min(total - 1, target));
            if (next === currentSlide) return;
            currentSlide = next;
            render();
        }

        /* ============================================================
         * EVENTOS
         * ============================================================ */
        function onKeydown(e) {
            if (isEditable(e.target)) return;
            if (e.key === "ArrowRight" || e.key === "PageDown") {
                e.preventDefault();
                if (canNavigate()) goToSlide(currentSlide + 1);
            } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
                e.preventDefault();
                if (canNavigate()) goToSlide(currentSlide - 1);
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                scrollToSection(currentSection + 1);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                scrollToSection(currentSection - 1);
            } else if (e.key === "Home") {
                e.preventDefault();
                scrollToSection(0);
            } else if (e.key === "End") {
                e.preventDefault();
                scrollToSection(totalSections - 1);
            }
        }

        function onWheel(e) {
            if (isEditable(e.target)) return;
            var absX = Math.abs(e.deltaX);
            var absY = Math.abs(e.deltaY);
            if (absX < WHEEL_THRESHOLD && absY < WHEEL_THRESHOLD) return;
            if (absX > absY) {
                if (!canNavigate()) return;
                if (e.deltaX > 0) goToSlide(currentSlide + 1);
                else goToSlide(currentSlide - 1);
            }
        }

        function onTouchStart(e) {
            var t = e.touches && e.touches[0];
            if (!t) return;
            touchStartX = t.clientX;
            touchStartY = t.clientY;
        }
        function onTouchEnd(e) {
            var t = (e.changedTouches && e.changedTouches[0]) || null;
            if (!t) return;
            var dx = t.clientX - touchStartX;
            var dy = t.clientY - touchStartY;
            var absX = Math.abs(dx);
            var absY = Math.abs(dy);
            if (absX < TOUCH_MIN_PX && absY < TOUCH_MIN_PX) return;
            if (absX > absY) {
                if (!canNavigate()) return;
                if (dx < 0) goToSlide(currentSlide + 1);
                else goToSlide(currentSlide - 1);
            }
        }

        function onCtaClick() {
            var el = sectionEls[currentSection];
            var url = (el && el.dataset.sbtHudCtaUrl) || root.dataset.ctaUrl || "#";
            var ev = new CustomEvent("starter-portfolio:cta", {
                detail: { section: currentSection, slide: currentSlide, url: url },
                bubbles: true,
            });
            btnCta.dispatchEvent(ev);
            if (url && url !== "#") window.open(url, "_blank", "noopener,noreferrer");
        }

        /* ---------- BIND ---------- */
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);
        window.addEventListener("keydown", onKeydown);
        root.addEventListener("wheel", onWheel, { passive: true });
        root.addEventListener("touchstart", onTouchStart, { passive: true });
        root.addEventListener("touchend", onTouchEnd, { passive: true });

        if (btnPrevSection) btnPrevSection.addEventListener("click", function () { scrollToSection(currentSection - 1); });
        if (btnNextSection) btnNextSection.addEventListener("click", function () { scrollToSection(currentSection + 1); });
        if (btnPrevSlide) btnPrevSlide.addEventListener("click", function () { goToSlide(currentSlide - 1); });
        if (btnNextSlide) btnNextSlide.addEventListener("click", function () { goToSlide(currentSlide + 1); });
        if (btnCta) btnCta.addEventListener("click", onCtaClick);

        /* ---------- INIT ---------- */
        root.classList.add("sbt-spatial-canvas--js-ready");
        void root.offsetHeight;

        pinStage();
        update();
        render();

        requestAnimationFrame(function () {
            pinStage();
            update();
        });

        // Watchdog: garante consistência se algum script externo engolir o scroll
        setInterval(function () {
            pinStage();
            update();
        }, 250);

        if (typeof ResizeObserver !== "undefined") {
            var ro = new ResizeObserver(function () { scheduleUpdate(); });
            ro.observe(root);
        }
    }

    function initAll() {
        document.querySelectorAll("[data-sbt-canvas]").forEach(function (el) {
            SpatialCanvas(el);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAll);
    } else {
        initAll();
    }
})();