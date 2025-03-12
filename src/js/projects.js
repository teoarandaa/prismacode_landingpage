class ProjectManager {
    constructor() {
        this.projectsContainer = document.getElementById('projects-container');
        this.projects = [];
    }

    async loadProjects() {
        try {
            console.log("Cargando proyectos...");
            const response = await fetch('data/projects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Proyectos cargados:", data.projects);
            this.projects = data.projects;
            this.renderProjects(this.projects);
        } catch (error) {
            console.error('Error al cargar los proyectos:', error);
            this.projectsContainer.innerHTML = `
                <div class="error-message">
                    <p>No se pudieron cargar los proyectos. Por favor, intenta de nuevo más tarde.</p>
                </div>
            `;
        }
    }

    renderProjects(projects) {
        if (!this.projectsContainer) {
            console.error('No se encontró el contenedor de proyectos');
            return;
        }
        
        this.projectsContainer.innerHTML = '';
        
        if (projects.length === 0) {
            this.projectsContainer.innerHTML = `
                <div class="no-projects">
                    <p>No se encontraron proyectos con los filtros seleccionados.</p>
                </div>
            `;
            return;
        }
        
        // Usar un contador para los retrasos de AOS
        let delayCounter = 0;
        
        projects.forEach(project => {
            const tags = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
            
            // URL por defecto si no se proporciona una
            const projectUrl = project.url || '#';
            
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-categories', project.categories);
            
            // Usar AOS con retrasos escalonados
            projectCard.setAttribute('data-aos', 'fade-up');
            projectCard.setAttribute('data-aos-delay', (delayCounter * 100).toString());
            delayCounter++;
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.alt || project.title}" loading="lazy">
                    <div class="project-overlay">
                        <a href="${projectUrl}" class="project-link" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${tags}
                    </div>
                    <div class="project-actions">
                        <a href="mailto:helpteam.prisma@gmail.com?subject=Consulta%20sobre%20proyecto%20similar%20a%20${encodeURIComponent(project.title)}" class="project-cta">
                            Solicitar proyecto similar
                        </a>
                    </div>
                </div>
            `;
            
            this.projectsContainer.appendChild(projectCard);
        });
        
        // Refrescar AOS después de añadir nuevos elementos
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }

    filterProjects(filter) {
        console.log("Filtrando proyectos por:", filter);
        
        if (filter === 'all') {
            console.log("Mostrando todos los proyectos");
            this.renderProjects(this.projects);
            return;
        }
        
        const filteredProjects = this.projects.filter(project => {
            const categories = project.categories.split(',');
            return categories.includes(filter);
        });
        
        console.log("Proyectos filtrados:", filteredProjects);
        this.renderProjects(filteredProjects);
    }
}

// Inicializar el gestor de proyectos cuando se carga el documento
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS con configuración optimizada
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: false
    });
    
    // Inicializar el gestor de proyectos
    const projectManager = new ProjectManager();
    projectManager.loadProjects();
    
    // Configurar los filtros
    setupFilters(projectManager);
    
    // Cerrar el menú al hacer clic en un enlace de navegación
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});

function setupFilters(projectManager) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log("Filtro clickeado:", this.getAttribute('data-filter'));
            
            // Quitar la clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir la clase active al botón clickeado
            this.classList.add('active');
            
            // Filtrar los proyectos
            const filter = this.getAttribute('data-filter');
            projectManager.filterProjects(filter);
        });
    });
}

// Configurar las tech-cards
document.addEventListener('DOMContentLoaded', function() {
    // IMPORTANTE: Asegurarse de que las tech-cards existen antes de añadir event listeners
    const techCards = document.querySelectorAll('.tech-card');
    
    if (techCards.length > 0) {
        // Añadir event listeners a todas las tech-cards
        techCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Cerrar cualquier otra card activa
                document.querySelectorAll('.tech-card.active').forEach(activeCard => {
                    if (activeCard !== this) {
                        activeCard.classList.remove('active');
                    }
                });
                
                // Toggle de la card actual
                this.classList.toggle('active');
            });
            
            // Prevenir que el click en la card inicie el drag del carousel
            card.addEventListener('mousedown', function(e) {
                e.stopPropagation();
            });
        });
        
        // Cerrar cards al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.tech-card')) {
                document.querySelectorAll('.tech-card.active').forEach(card => {
                    card.classList.remove('active');
                });
            }
        });
    }
});

// Función para aplicar un filtro específico
function applyFilter(filterValue) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (filterValue === 'all') {
            card.style.display = 'flex';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            const categories = card.getAttribute('data-categories');
            if (categories && categories.includes(filterValue)) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        }
    });
}

// Función para cargar todos los proyectos desde el JSON
async function loadAllProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) {
        console.error('No se encontró el contenedor de proyectos');
        return;
    }
    
    try {
        // Cargar los proyectos desde el archivo JSON
        const response = await fetch('data/projects.json');
        const data = await response.json();
        
        // Limpiar el contenedor
        projectsGrid.innerHTML = '';
        
        // Añadir cada proyecto al grid
        data.projects.forEach((project, index) => {
            // Asegurarse de que el proyecto tenga categorías
            const categories = project.categories || getCategoriesFromProject(project.title, project.description);
            
            // Obtener tags para mostrar
            const tags = project.tags || getTagsFromCategories(categories);
            
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-categories', categories);
            projectCard.style.animationDelay = `${index * 0.1}s`;
            
            const tagsHTML = tags ? 
                `<div class="project-tags">${tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}</div>` : '';
            
            projectCard.innerHTML = `
                <div class="project-img">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    ${tagsHTML}
                    <p>${project.description}</p>
                    <a href="index.html#contact" class="project-cta">Solicitar proyecto similar</a>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
        
        // Aplicar el filtro activo inicialmente
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter) {
            applyFilter(activeFilter.getAttribute('data-filter'));
        }
        
    } catch (error) {
        console.error('Error al cargar los proyectos:', error);
        projectsGrid.innerHTML = '<p class="error-message">No se pudieron cargar los proyectos. Por favor, intenta de nuevo más tarde.</p>';
    }
}

// Función para inferir categorías basadas en el título y descripción
function getCategoriesFromProject(title, description) {
    title = title.toLowerCase();
    description = description.toLowerCase();
    const categories = [];
    
    // Detectar categorías basadas en palabras clave
    if (title.includes('app') || description.includes('app') || 
        title.includes('móvil') || description.includes('móvil') ||
        title.includes('ios') || description.includes('ios') ||
        title.includes('android') || description.includes('android') ||
        title.includes('flutter') || description.includes('flutter')) {
        categories.push('app');
    }
    
    if (title.includes('web') || description.includes('web') ||
        title.includes('sitio') || description.includes('sitio') ||
        title.includes('página') || description.includes('página') ||
        title.includes('laravel') || description.includes('laravel')) {
        categories.push('web');
    }
    
    if (title.includes('ecommerce') || description.includes('ecommerce') ||
        title.includes('tienda') || description.includes('tienda') ||
        title.includes('comercio') || description.includes('comercio') ||
        title.includes('venta') || description.includes('venta')) {
        categories.push('ecommerce');
    }
    
    // Si no se detectó ninguna categoría, asignar 'web' por defecto
    if (categories.length === 0) {
        categories.push('web');
    }
    
    return categories.join(',');
}

// Función para convertir categorías en tags para mostrar
function getTagsFromCategories(categoriesString) {
    const categoriesMap = {
        'web': 'Desarrollo Web',
        'app': 'Aplicación Móvil',
        'ecommerce': 'E-commerce',
        'design': 'Diseño UX/UI'
    };
    
    return categoriesString.split(',')
        .map(category => categoriesMap[category] || category);
}

function createProjectCard(project) {
    return `
        <div class="project-card" data-categories="${project.categories}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.alt || project.title}" loading="lazy">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <a href="${project.url}" class="project-cta" target="_blank" rel="noopener">Ver proyecto</a>
                </div>
            </div>
        </div>
    `;
} 