// Inicializa as animações da biblioteca AOS
AOS.init();

// SCRIPT DO CARROSSEL ARRASTÁVEL
const slider = document.getElementById('cert-carousel');

// Boas Práticas (Qualidade): Só executa o código se o carrossel existir na página
if (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false; // Variável para saber se apenas clicou ou se arrastou

    // Quando aperta o botão do mouse
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false; // Reseta o arraste
        slider.classList.add('cursor-grabbing'); // Muda para mãozinha fechada
        slider.classList.remove('cursor-grab');
        slider.style.scrollSnapType = 'none'; // Desativa o "snap" temporariamente para arrastar suave
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    // Quando o mouse sai da área do carrossel
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('cursor-grabbing');
        slider.classList.add('cursor-grab');
        slider.style.scrollSnapType = 'x mandatory'; // Reativa o snap
    });

    // Quando solta o botão do mouse
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('cursor-grabbing');
        slider.classList.add('cursor-grab');
        slider.style.scrollSnapType = 'x mandatory'; // Reativa o snap
    });

    // Quando move o mouse
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return; // Se não estiver segurando o clique, não faz nada
        e.preventDefault(); // Evita selecionar textos/imagens nativamente
        isDragging = true; // Avisa que o usuário está arrastando
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // O multiplicador '2' é a velocidade do arraste
        slider.scrollLeft = scrollLeft - walk;
    });

    // Impede que os links sejam clicados se o usuário estiver apenas arrastando
    const certLinks = slider.querySelectorAll('a');
    certLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault(); // Cancela a abertura do link
            }
        });
    });
}