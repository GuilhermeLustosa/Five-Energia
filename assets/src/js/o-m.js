// (Este é o seu script.js existente - não precisa ser alterado)

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Animação de Scroll ---
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

    // --- 2. Funcionalidade da Timeline (da página Quem Somos) ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabLinks.length > 0 && tabPanes.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-tab');
                const targetPane = document.getElementById(targetId);

                tabLinks.forEach(l => l.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                link.classList.add('active');
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
});