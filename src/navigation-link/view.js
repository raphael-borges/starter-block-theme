/**
 * Sticky navigation for anchor links.
 */

document.addEventListener("DOMContentLoaded", () => {
	const navBlocks = document.querySelectorAll(
		".wp-block-starter-block-theme-inline-nav",
	);

	if (!navBlocks.length) return;

	navBlocks.forEach((nav) => {
		let originalOffsetTop = nav.offsetTop;
		let lastAnchor = null;
		let stickyClass = "is-sticky";
		let ticking = false;
		let sections = [];
		let menuItems = [];

		const links = nav.querySelectorAll('a[href*="#"]');

		// =========================================================
		// NOVA FUNÇÃO BLINDADA DE SCROLL
		// =========================================================
		const smoothScrollTo = (targetElement, targetId) => {
			// No celular, damos um respiro gigante (140px) por causa da barra do navegador e do menu. 
			// No PC, mantemos 90px.
			const offsetGap = window.innerWidth <= 768 ? 140 : 90;
			
			// Pega a posição exata absoluta no documento
			const elementPosition = targetElement.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.scrollY - offsetGap;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth"
			});

			// Atualiza a URL sem recarregar a página
			if (targetId) {
				history.pushState(null, null, `#${targetId}`);
			}
		};

		// =========================================================
		// 1. CRIAÇÃO DINÂMICA DO SELECT PARA MOBILE
		// =========================================================
		let selectWrapper = nav.querySelector(".wp-block-starter-block-theme-inline-nav__select-wrapper");
		let selectEl = nav.querySelector(".wp-block-starter-block-theme-inline-nav__select");

		if (!selectWrapper) {
			selectWrapper = document.createElement("div");
			selectWrapper.className = "wp-block-starter-block-theme-inline-nav__select-wrapper";
			
			selectEl = document.createElement("select");
			selectEl.className = "wp-block-starter-block-theme-inline-nav__select";

			links.forEach((link) => {
				const option = document.createElement("option");
				option.value = link.getAttribute("href");
				option.textContent = link.textContent;
				selectEl.appendChild(option);
			});

			selectWrapper.appendChild(selectEl);
			nav.appendChild(selectWrapper);

			// Evento de rolagem para o Select Mobile
			selectEl.addEventListener("change", (e) => {
				const href = e.target.value;
				const hashIndex = href.indexOf("#");
				
				if (hashIndex !== -1) {
					const targetId = href.substring(hashIndex + 1);
					const targetElement = document.getElementById(targetId);

					if (targetElement) {
						smoothScrollTo(targetElement, targetId);
					}
				}
			});
		}

		// =========================================================
		// 2. MAPEAMENTO DAS SEÇÕES
		// =========================================================
		links.forEach((link) => {
			const href = link.getAttribute("href");
			const hashIndex = href ? href.indexOf("#") : -1;
			
			if (hashIndex !== -1) {
				const targetId = href.substring(hashIndex + 1);
				
				if (targetId) {
					const targetElement = document.getElementById(targetId);

					if (targetElement) {
						sections.push({
							id: targetId,
							element: targetElement,
							menuItem: link.closest(".wp-block-starter-block-theme-inline-nav__item"),
						});
						menuItems.push({
							item: link.closest(".wp-block-starter-block-theme-inline-nav__item"),
							section: targetElement,
							link: link,
						});
					}
				}
			}
		});

		if (sections.length) {
			lastAnchor = sections[sections.length - 1].element;
		}

		const isPastLastSection = () => {
			if (!lastAnchor) return false;
			let measureElement = lastAnchor;
			if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(lastAnchor.tagName)) {
				measureElement = lastAnchor.parentElement;
			}
			const hidePoint = window.innerWidth > 768 ? (window.innerHeight / 2) : 100;
			return measureElement.getBoundingClientRect().bottom <= hidePoint;
		};

		const getActiveSection = () => {
			let activeSection = null;
			for (let i = sections.length - 1; i >= 0; i--) {
				const rect = sections[i].element.getBoundingClientRect();
				if (rect.top <= window.innerHeight * 0.5) {
					activeSection = sections[i];
					break;
				}
			}
			return activeSection;
		};

		// =========================================================
		// 3. ATUALIZA O SELETOR E OS LINKS ATIVOS
		// =========================================================
		const updateActiveMenuItem = () => {
			const activeSection = getActiveSection();

			menuItems.forEach((menuItem) => {
				if (menuItem.item) {
					menuItem.item.classList.remove("active");
				}
			});

			if (activeSection && activeSection.menuItem) {
				activeSection.menuItem.classList.add("active");
				
				const activeLink = activeSection.menuItem.querySelector("a");
				if (activeLink && selectEl) {
					const exactHref = activeLink.getAttribute("href");
					if (selectEl.value !== exactHref) {
						selectEl.value = exactHref;
					}
				}
			} else if (sections.length > 0 && !isPastLastSection()) {
				const firstSection = sections[0];
				if (firstSection && firstSection.menuItem) {
					firstSection.menuItem.classList.add("active");
					
					const activeLink = firstSection.menuItem.querySelector("a");
					if (activeLink && selectEl) {
						const exactHref = activeLink.getAttribute("href");
						if (selectEl.value !== exactHref) {
							selectEl.value = exactHref;
						}
					}
				}
			}
		};

		// =========================================================
		// 4. LÓGICA DE APARECER / SUMIR / POSICIONAR
		// =========================================================
		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					const scrollY = window.scrollY;
					
					let shouldBeSticky = false;
					if (scrollY >= originalOffsetTop && !isPastLastSection()) {
						shouldBeSticky = true;
					}

					if (shouldBeSticky) {
						nav.classList.add(stickyClass);

						if (window.innerWidth > 768) {
							const firstLink = nav.querySelector('a[href*="#"]');
							if (firstLink) {
								const targetId = firstLink.getAttribute("href").substring(firstLink.getAttribute("href").indexOf("#") + 1);
								const targetElement = document.getElementById(targetId);

								if (targetElement) {
									const childElement = targetElement.firstElementChild;
									const elementToMeasure = childElement ? childElement : targetElement;
									
									const rect = elementToMeasure.getBoundingClientRect();
									const leftPosition = rect.left + rect.width + 24;

									nav.style.left = `${leftPosition}px`;
									nav.style.right = 'auto';
								}
							}
						} else {
							nav.style.left = '';
							nav.style.right = '';
						}
					} else {
						nav.classList.remove(stickyClass);
						nav.style.left = '';
						nav.style.right = '';
					}

					updateActiveMenuItem();
					ticking = false;
				});
				ticking = true;
			}
		};

		const recalcOffset = () => {
			if (!nav.classList.contains(stickyClass)) {
				originalOffsetTop = nav.offsetTop;
			}
			handleScroll();
		};

		// =========================================================
		// 5. CLIQUE NO MENU DO DESKTOP
		// =========================================================
		links.forEach((link) => {
			link.addEventListener("click", (e) => {
				const href = link.getAttribute("href");
				const hashIndex = href ? href.indexOf("#") : -1;
				
				if (hashIndex !== -1) {
					const targetId = href.substring(hashIndex + 1);
					const targetElement = document.getElementById(targetId);

					if (targetElement) {
						e.preventDefault();
						smoothScrollTo(targetElement, targetId);
					}
				}
			});
		});

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", recalcOffset);
		handleScroll();
		updateActiveMenuItem();
	});
});