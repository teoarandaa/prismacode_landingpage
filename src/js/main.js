document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Cambiar estilo del navbar al hacer scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Función simplificada para manejar los clics en las tech-cards
    function handleTechCardClick(e) {
        const card = e.currentTarget;
        
        // Cerrar cualquier otra card activa
        document.querySelectorAll('.tech-card.active').forEach(activeCard => {
            if (activeCard !== card) {
                activeCard.classList.remove('active');
            }
        });

        // Toggle de la card actual
        card.classList.toggle('active');
    }

    // Añadir event listeners a todas las tech-cards
    document.querySelectorAll('.tech-card').forEach(card => {
        card.addEventListener('click', handleTechCardClick);
    });

    // Cerrar cards al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.tech-card')) {
            document.querySelectorAll('.tech-card.active').forEach(card => {
                card.classList.remove('active');
            });
        }
    });

    // Prevenir que el click en la card inicie el drag del carousel
    document.querySelectorAll('.tech-card').forEach(card => {
        card.addEventListener('mousedown', (e) => {
            e.stopPropagation();
        });
    });
}); 