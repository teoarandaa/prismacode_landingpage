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