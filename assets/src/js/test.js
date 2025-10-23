document.addEventListener('DOMContentLoaded', () => {
    
    const wrapper = document.querySelector('.carousel-wrapper');
    const container = document.querySelector('.carousel-container');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const pagination = document.querySelector('.carousel-pagination');
    
    if (!container || slides.length === 0) {
        console.error('Elementos do carrossel não encontrados.');
        return;
    }

    let currentIndex = 0;
    let slideCount = slides.length;
    let autoplayInterval = null;
    const AUTOPLAY_DELAY = 5000; // 5 segundos, como no vídeo

    // 1. Criar a Paginação (pontinhos)
    function createPagination() {
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('pagination-dot');
            dot.setAttribute('aria-label', `Ir para o slide ${index + 1}`);
            
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });
            
            pagination.appendChild(dot);
        });
    }

    // 2. Função principal para mover para um slide
    function goToSlide(index) {
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }

        currentIndex = index;

        const activeSlide = slides[currentIndex];
        
        // Calcular o deslocamento para centralizar o slide ativo
        // Posição central do wrapper
        const wrapperCenter = wrapper.offsetWidth / 2;
        // Posição central do slide ativo (metade da largura dele + seu 'offsetLeft')
        const slideCenter = activeSlide.offsetLeft + activeSlide.offsetWidth / 2;
        
        // O valor do 'transform' é a diferença para centralizar
        const offset = wrapperCenter - slideCenter;

        // Aplica o movimento ao container
        container.style.transform = `translateX(${offset}px)`;

        // Atualiza as classes 'active'
        updateActiveClasses();
    }

    // 3. Atualizar classes ativas (para slides e pontos)
    function updateActiveClasses() {
        // Atualiza os slides
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Atualiza os pontos da paginação
        const dots = document.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // 4. Funções para o Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, AUTOPLAY_DELAY);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // 5. Lidar com redimensionamento da janela
    // (Precisa recalcular o offset se a tela mudar)
    window.addEventListener('resize', () => {
        // Usamos um 'timeout' para não sobrecarregar o navegador
        setTimeout(() => {
            goToSlide(currentIndex);
        }, 300);
    });

    // 6. Inicialização
    function init() {
        createPagination();
        goToSlide(0); // Começa no primeiro slide
        startAutoplay();
    }

    init();
});