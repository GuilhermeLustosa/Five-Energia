// Adicione este código ao seu arquivo script.js existente

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Animação de Scroll (Você já deve ter isso) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // 10% visível
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- 2. Funcionalidade da Timeline (NOVO) ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Verifica se existem tabs na página atual
    if (tabLinks.length > 0 && tabPanes.length > 0) {
        
        tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // 1. Pega o ID do alvo (ex: "ano-2014")
                const targetId = link.getAttribute('data-tab');
                const targetPane = document.getElementById(targetId);

                // 2. Remove 'active' de todos os links e painéis
                tabLinks.forEach(l => l.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                // 3. Adiciona 'active' ao link clicado e ao painel correspondente
                link.classList.add('active');
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
});