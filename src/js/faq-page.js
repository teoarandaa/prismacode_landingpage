document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Manejo del acordeón para FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        // Activar el primer elemento por defecto
        faqItems[0].classList.add('active');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Si ya está activo, desactivarlo
                const isActive = item.classList.contains('active');
                
                // Cerrar todos los items activos
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Si no estaba activo, activarlo
                if (!isActive) {
                    item.classList.add('active');
                    
                    // Scroll suave al elemento
                    setTimeout(() => {
                        question.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }, 100);
                }
            });
        });
    }
    
    // Manejo de las categorías de filtrado
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar la clase active de todos los botones
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Añadir la clase active al botón clicked
            button.classList.add('active');
            
            // Filtrar las preguntas por categoría
            const category = button.getAttribute('data-category');
            filterFAQItems(category);
            
            // Activar el primer elemento de la categoría seleccionada
            activateFirstVisibleItem();
        });
    });
    
    // Función para filtrar elementos del FAQ
    function filterFAQItems(category) {
        faqItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
                item.classList.remove('active');
            }
        });
    }
    
    // Función para activar el primer elemento visible
    function activateFirstVisibleItem() {
        const visibleItems = document.querySelectorAll('.faq-item:not(.hidden)');
        if (visibleItems.length > 0) {
            visibleItems.forEach(item => item.classList.remove('active'));
            visibleItems[0].classList.add('active');
        }
    }
});
