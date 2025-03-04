document.addEventListener('DOMContentLoaded', function() {
    console.log("Tech cards script loaded");
    
    // Función para manejar el clic en las tech-cards
    function handleTechCardClick(e) {
        const card = e.currentTarget;
        console.log("Tech card clicked:", card);
        
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
    const techCards = document.querySelectorAll('.tech-card');
    console.log("Found tech cards:", techCards.length);
    
    techCards.forEach(card => {
        card.addEventListener('click', handleTechCardClick);
    });
    
    // Cerrar cards al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.tech-card')) {
            document.querySelectorAll('.tech-card.active').forEach(card => {
                card.classList.remove('active');
            });
        }
    });
}); 