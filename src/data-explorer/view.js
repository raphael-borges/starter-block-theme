document.addEventListener('DOMContentLoaded', () => {
	const buttons = document.querySelectorAll('.item-card');
	const mainImg = document.getElementById('main-feature-image');

	// Se não encontrar a imagem, interrompe o script para evitar erros
	if (!mainImg) return;

	buttons.forEach(button => {
		const updateImage = () => {
			const newSrc = button.getAttribute('data-img');
			
			// Só executa se a imagem tiver um link e for diferente da imagem atual
			if (newSrc && !mainImg.src.includes(newSrc)) {
				
				// 1. Remove a classe de animação caso ela já esteja lá
				mainImg.classList.remove('image-pop-fade');
				
				// 2. Força um "Reflow" no navegador (isso reseta a animação do CSS)
				void mainImg.offsetWidth; 
				
				// 3. Troca o link da imagem
				mainImg.src = newSrc;
				
				// 4. Adiciona a classe de volta para rodar o Fade + Pop-up
				mainImg.classList.add('image-pop-fade');

				// (Opcional) Atualiza o estado visual de "ativo" no botão do front-end
				buttons.forEach(btn => btn.classList.remove('is-active'));
				button.classList.add('is-active');
			}
		};

		// Executa a troca tanto ao passar o mouse quanto ao clicar (para mobile)
		button.addEventListener('mouseenter', updateImage);
		button.addEventListener('click', updateImage);
	});
});