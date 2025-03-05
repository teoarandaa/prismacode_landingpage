document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: false
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

    // Manejo de modales para la sección "¿Por qué digitalizar tu empresa?"
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    // Abrir modal al hacer clic en "Leer más"
    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
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

    // Cerrar modal al hacer clic en el botón de cierre (para ambos tipos de modales)
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

    // Cerrar modal al hacer clic fuera del contenido (para ambos tipos de modales)
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

    // Función para activar las animaciones cuando los elementos son visibles
    function checkVisibility() {
        const approachSection = document.querySelector('.approach');
        const projectsSection = document.querySelector('.projects');
        const pricingSection = document.querySelector('.pricing');
        
        if (approachSection) {
            const rect = approachSection.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100 && rect.bottom >= 0) {
                approachSection.classList.add('animate');
            } else {
                approachSection.classList.remove('animate');
            }
        }
        
        if (projectsSection) {
            const rect = projectsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100 && rect.bottom >= 0) {
                projectsSection.classList.add('animate');
            } else {
                projectsSection.classList.remove('animate');
            }
        }
        
        if (pricingSection) {
            const rect = pricingSection.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100 && rect.bottom >= 0) {
                pricingSection.classList.add('animate');
            } else {
                pricingSection.classList.remove('animate');
            }
        }
    }

    // Verificar visibilidad al cargar y al hacer scroll
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
});

// Función para cargar los proyectos en un carrusel
function loadProjects() {
    const projectsContainer = document.querySelector('.projects .container');
    
    if (!projectsContainer) {
        console.error("No se encontró el contenedor de proyectos");
        return;
    }
    
    // Array de proyectos
    const projects = [
        {
            title: "Plataforma E-commerce para Boutique de Moda",
            description: "Desarrollo completo de tienda online con catálogo personalizado, sistema de pagos integrado y panel de administración intuitivo que incrementó las ventas en un 45%.",
            image: "assets/project1.jpg"
        },
        {
            title: "App de Delivery para Restaurantes Locales",
            description: "Aplicación nativa para iOS y Android que conecta restaurantes con clientes, incluyendo seguimiento en tiempo real, sistema de valoraciones y programa de fidelización.",
            image: "assets/project2.jpg"
        },
        {
            title: "Dashboard Analítico para Empresa Financiera",
            description: "Interfaz interactiva para visualización de métricas empresariales con gráficos personalizables, alertas automáticas y reportes exportables que optimizó la toma de decisiones.",
            image: "assets/project3.jpg"
        },
        {
            title: "Rediseño de Identidad Visual Corporativa",
            description: "Actualización completa de marca para empresa de servicios financieros, incluyendo logo, paleta de colores, tipografía y materiales promocionales que modernizó su imagen.",
            image: "assets/project4.jpg"
        }
    ];
    
    // Crear estructura HTML para la sección de proyectos
    let projectsHTML = `
        <h2>Nuestros Proyectos</h2>
        <p class="section-intro">Explora algunos de nuestros trabajos más recientes y descubre cómo nuestras soluciones digitales han ayudado a empresas como la tuya a alcanzar sus objetivos.</p>
    `;
    
    // Añadir estructura del carrusel
    projectsHTML += `
        <div class="carousel-container">
            <div class="carousel-track">
                ${projects.map(project => `
                    <div class="carousel-slide">
                        <div class="project-card">
                            <div class="project-img">
                                <img src="${project.image}" alt="${project.title}">
                            </div>
                            <div class="project-info">
                                <h3>${project.title}</h3>
                                <p>${project.description}</p>
                                <a href="#contact" class="project-cta">Solicitar proyecto similar</a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="carousel-button prev" aria-label="Proyecto anterior">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
            </button>
            <button class="carousel-button next" aria-label="Proyecto siguiente">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
            </button>
            <div class="carousel-dots">
                ${projects.map((_, index) => `
                    <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Ver proyecto ${index + 1}"></button>
                `).join('')}
            </div>
        </div>
    `;
    
    // Insertar todo el HTML en el contenedor
    projectsContainer.innerHTML = projectsHTML;
    
    // Inicializar el carrusel
    initCarousel();
}

// Función para inicializar el carrusel
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsNav = document.querySelector('.carousel-dots');
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));
    
    if (!track || !slides.length || !nextButton || !prevButton || !dotsNav || !dots.length) {
        console.error("No se encontraron los elementos necesarios para el carrusel");
        return;
    }
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    // Posicionar los slides uno al lado del otro
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });
    
    // Función para mover a un slide específico
    const moveToSlide = (currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };
    
    // Función para actualizar los dots
    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('active');
        targetDot.classList.add('active');
    };
    
    // Función para ocultar/mostrar flechas
    const updateArrows = (targetIndex) => {
        prevButton.classList.toggle('hidden', targetIndex === 0);
        nextButton.classList.toggle('hidden', targetIndex === slides.length - 1);
    };
    
    // Establecer el primer slide como actual
    slides[0].classList.add('current-slide');
    
    // Event listener para el botón siguiente
    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.active');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.indexOf(nextSlide);
        
        if (nextSlide) {
            moveToSlide(currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
            updateArrows(nextIndex);
        }
    });
    
    // Event listener para el botón anterior
    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.active');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.indexOf(prevSlide);
        
        if (prevSlide) {
            moveToSlide(currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
            updateArrows(prevIndex);
        }
    });
    
    // Event listener para los dots
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        
        if (!targetDot) return;
        
        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.active');
        const targetIndex = parseInt(targetDot.getAttribute('data-index'));
        const targetSlide = slides[targetIndex];
        
        moveToSlide(currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        updateArrows(targetIndex);
    });
    
    // Inicialmente ocultar el botón anterior
    updateArrows(0);
    
    // Añadir swipe para dispositivos móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.active');
        const currentIndex = slides.indexOf(currentSlide);
        
        if (touchEndX < touchStartX - 50 && currentIndex < slides.length - 1) {
            // Swipe izquierda (siguiente)
            const nextSlide = currentSlide.nextElementSibling;
            const nextDot = currentDot.nextElementSibling;
            const nextIndex = currentIndex + 1;
            
            moveToSlide(currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
            updateArrows(nextIndex);
        } else if (touchEndX > touchStartX + 50 && currentIndex > 0) {
            // Swipe derecha (anterior)
            const prevSlide = currentSlide.previousElementSibling;
            const prevDot = currentDot.previousElementSibling;
            const prevIndex = currentIndex - 1;
            
            moveToSlide(currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
            updateArrows(prevIndex);
        }
    }
} 