class ProjectManager {
    constructor() {
        this.projectsContainer = document.getElementById('projectsContainer');
    }

    async loadProjects() {
        try {
            const response = await fetch('data/projects.json');
            const data = await response.json();
            this.renderProjects(data.projects);
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }

    renderProjects(projects) {
        projects.forEach((project, index) => {
            const projectElement = this.createProjectElement(project, index);
            this.projectsContainer.appendChild(projectElement);
        });
    }

    createProjectElement(project, index) {
        const delay = index * 200;
        const element = document.createElement('div');
        element.className = 'project-card';
        element.setAttribute('data-aos', 'fade-up');
        element.setAttribute('data-aos-delay', delay.toString());

        element.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;

        return element;
    }
}

// Inicializar el gestor de proyectos cuando se carga el documento
document.addEventListener('DOMContentLoaded', () => {
    const projectManager = new ProjectManager();
    projectManager.loadProjects();
});

// Archivo específico para la página de proyectos
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Inicializar AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        disable: true
    });
    
    // Configurar los filtros de proyectos
    setupFilters();
    
    // IMPORTANTE: Asegurarse de que las tech-cards existen antes de añadir event listeners
    const techCards = document.querySelectorAll('.tech-card');
    console.log("Tech cards found:", techCards.length);
    
    if (techCards.length > 0) {
        // Añadir event listeners a todas las tech-cards
        techCards.forEach(card => {
            card.addEventListener('click', function(e) {
                console.log("Tech card clicked");
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
        
        // Crear overlay para el fondo si no existe
        if (!document.querySelector('.overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);
        }
    }
});

// Función para configurar los filtros de proyectos
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Aplicar el filtro
            const filterValue = button.getAttribute('data-filter');
            applyFilter(filterValue);
        });
    });
}

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
                    <img src="${project.image}" alt="${project.title}">
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