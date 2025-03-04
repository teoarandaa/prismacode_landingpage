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
    
    // Crear overlay para el fondo
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Manejo del modal de información de dominio
    const domainInfoIcon = document.getElementById('domainInfoIcon');
    const domainInfoModal = document.getElementById('domainInfoModal');
    const closeModalBtn = document.querySelector('.close-modal');

    if (domainInfoIcon && domainInfoModal) {
        // Abrir modal al hacer clic en el icono
        domainInfoIcon.onclick = function() {
            domainInfoModal.style.display = "block";
            console.log("Modal abierto");
        }
        
        // Cerrar modal al hacer clic en la X
        if (closeModalBtn) {
            closeModalBtn.onclick = function() {
                domainInfoModal.style.display = "none";
            }
        }
        
        // Cerrar modal al hacer clic fuera del contenido
        window.onclick = function(event) {
            if (event.target == domainInfoModal) {
                domainInfoModal.style.display = "none";
            }
        }
    } else {
        console.error("Elementos del modal no encontrados", {
            icon: domainInfoIcon,
            modal: domainInfoModal,
            closeBtn: closeModalBtn
        });
    }

    // Manejo de modales para la sección "Nuestro Enfoque"
    const approachCards = document.querySelectorAll('.approach-card');
    const approachModals = document.querySelectorAll('.approach-modal');
    const closeButtons = document.querySelectorAll('.close-approach-modal');

    // Abrir modal al hacer clic en una tarjeta
    approachCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                // Mostrar el modal sin transición inicial
                modal.style.transition = 'none';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                modal.style.backdropFilter = 'blur(0px)';
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Evitar scroll en el fondo
                
                // Forzar un reflow para que los cambios se apliquen inmediatamente
                void modal.offsetWidth;
                
                // Restaurar la transición y aplicar el oscurecimiento
                modal.style.transition = 'background-color 0.3s ease, backdrop-filter 0.3s ease';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                modal.style.backdropFilter = 'blur(5px)';
            }
        });
    });

    // Cerrar modal al hacer clic en el botón de cierre
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.approach-modal');
            if (modal) {
                // Quitar el oscurecimiento
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                modal.style.backdropFilter = 'blur(0px)';
                
                // Ocultar después de la transición
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = ''; // Restaurar scroll
                }, 300);
            }
        });
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (event) => {
        approachModals.forEach(modal => {
            if (event.target === modal) {
                // Quitar el oscurecimiento
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                modal.style.backdropFilter = 'blur(0px)';
                
                // Ocultar después de la transición
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = ''; // Restaurar scroll
                }, 300);
            }
        });
    });
}); 