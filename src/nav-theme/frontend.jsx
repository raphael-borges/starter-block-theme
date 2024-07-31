// Toggle to show and hide navbar menu
const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");

function toggleAriaExpanded(element) {
	const isExpanded = element.getAttribute("aria-expanded") === "true";
	element.setAttribute("aria-expanded", !isExpanded);
}

burgerMenu.addEventListener("click", () => {
	navbarMenu.classList.toggle("is-active");
	burgerMenu.classList.toggle("is-active");
	toggleAriaExpanded(burgerMenu);
});

// Toggle to show and hide dropdown menu
const dropdown = document.querySelectorAll(".navbar-theme-block .has-child");

dropdown.forEach((item) => {
	const dropdownToggle = item.querySelector(".submenu-plus");

	dropdownToggle.addEventListener("click", () => {
		const dropdownShow = document.querySelector(".dropdown-show");
		toggleDropdownItem(item);

		if (dropdownShow && dropdownShow != item) {
			toggleDropdownItem(dropdownShow);
		}
	});
});

// Function to display the dropdown menu
const toggleDropdownItem = (item) => {
	const dropdownContent = item.querySelector(
		".wp-block-navigation__submenu-container",
	);

	// Remove other dropdown that have 'dropdown-show' class
	if (item.classList.contains("dropdown-show")) {
		dropdownContent.removeAttribute("style");
		item.classList.remove("dropdown-show");
	} else {
		// Added max-height on active 'dropdown-show' class
		dropdownContent.style.height = dropdownContent.scrollHeight + "px";
		item.classList.add("dropdown-show");
	}
};

// Fixed dropdown menu on window resizing
window.addEventListener("resize", () => {
	if (window.innerWidth > 992) {
		document
			.querySelectorAll(".wp-block-navigation__submenu-container")
			.forEach((item) => {
				item.removeAttribute("style");
			});
		dropdown.forEach((item) => {
			item.classList.remove("dropdown-show");
		});
	}
});

// Fixed navbar menu on window resizing
window.addEventListener("resize", () => {
	if (window.innerWidth > 992) {
		if (navbarMenu.classList.contains("is-active")) {
			navbarMenu.classList.remove("is-active");
			burgerMenu.classList.remove("is-active");
		}
	}
});

window.addEventListener("resize", () => {
	if (window.innerWidth > 992) {
		document.querySelectorAll(".has-child").forEach((item) => {
			const linkMenu = item.querySelectorAll(
				".wp-block-navigation-item__content",
			);
			console.log(linkMenu);
		});
	}
});
