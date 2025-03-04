document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        disable: true // Desactivamos AOS para usar nuestras propias animaciones
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

    // Función para activar las animaciones cuando los elementos son visibles
    function checkVisibility() {
        const approachSection = document.querySelector('.approach');
        const benefitsSection = document.querySelector('.benefits');
        const projectsSection = document.querySelector('.projects'); // Añadimos la sección de proyectos
        
        if (approachSection) {
            const rect = approachSection.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100 && rect.bottom >= 0) {
                approachSection.classList.add('animate');
            } else {
                approachSection.classList.remove('animate');
            }
        }
        
        if (benefitsSection) {
            const rect = benefitsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100 && rect.bottom >= 0) {
                benefitsSection.classList.add('animate');
            } else {
                benefitsSection.classList.remove('animate');
            }
        }
        
        // Añadimos la verificación para la sección de proyectos
        if (projectsSection) {
            const rect = projectsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100 && rect.bottom >= 0) {
                projectsSection.classList.add('animate');
            } else {
                projectsSection.classList.remove('animate');
            }
        }
    }
    
    // Verificar visibilidad al hacer scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Llamamos a checkVisibility después de un pequeño retraso
    setTimeout(checkVisibility, 100);
    
    // Cargar los proyectos
    loadProjects();
});

// Función simplificada para cargar los proyectos sin filtros ni destacados
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
    
    // Añadir grid de proyectos
    projectsHTML += '<div class="projects-grid">';
    
    // Añadir cada proyecto al grid
    projects.forEach(project => {
        projectsHTML += `
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
        `;
    });
    
    projectsHTML += '</div>';
    
    // Insertar todo el HTML en el contenedor
    projectsContainer.innerHTML = projectsHTML;
    
    // Aplicar transiciones a las tarjetas
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
} 