document.addEventListener('DOMContentLoaded', function() {
    const faqButton = document.getElementById('faqButton');
    
    if (faqButton) {
        // Verificar si estamos en la página de FAQ
        const isFaqPage = window.location.pathname.includes('faq.html');
        
        // Handle click event
        faqButton.addEventListener('click', function() {
            if (isFaqPage) {
                // Si ya estamos en la página de FAQ, scroll al principio
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Si no estamos en la página de FAQ, redirigir a ella
                window.location.href = 'faq.html';
            }
        });
        
        // Función para detectar si el botón está sobre fondo morado
        function updateFaqButtonStyle() {
            // Elementos con fondo morado
            const heroSection = document.querySelector('.hero');
            const approachSection = document.querySelector('.approach');
            const partnershipSection = document.querySelector('.partnership');
            
            if (!heroSection && !approachSection && !partnershipSection) return;
            
            // Obtener la posición del botón
            const buttonRect = faqButton.getBoundingClientRect();
            const buttonCenter = {
                x: buttonRect.left + buttonRect.width / 2,
                y: buttonRect.top + buttonRect.height / 2
            };
            
            // Comprobar si el botón está sobre alguna sección con fondo morado
            let isOnPurple = false;
            
            if (heroSection) {
                const heroRect = heroSection.getBoundingClientRect();
                if (
                    buttonCenter.y >= heroRect.top && 
                    buttonCenter.y <= heroRect.bottom && 
                    buttonCenter.x >= heroRect.left && 
                    buttonCenter.x <= heroRect.right
                ) {
                    isOnPurple = true;
                }
            }
            
            if (approachSection && !isOnPurple) {
                const approachRect = approachSection.getBoundingClientRect();
                if (
                    buttonCenter.y >= approachRect.top && 
                    buttonCenter.y <= approachRect.bottom && 
                    buttonCenter.x >= approachRect.left && 
                    buttonCenter.x <= approachRect.right
                ) {
                    isOnPurple = true;
                }
            }
            
            if (partnershipSection && !isOnPurple) {
                const partnershipRect = partnershipSection.getBoundingClientRect();
                if (
                    buttonCenter.y >= partnershipRect.top && 
                    buttonCenter.y <= partnershipRect.bottom && 
                    buttonCenter.x >= partnershipRect.left && 
                    buttonCenter.x <= partnershipRect.right
                ) {
                    isOnPurple = true;
                }
            }
            
            // Actualizar la clase del botón según la posición
            if (isOnPurple) {
                faqButton.classList.add('on-purple');
            } else {
                faqButton.classList.remove('on-purple');
            }
        }
        
        // Actualizar el estilo del botón inicialmente
        updateFaqButtonStyle();
        
        // Actualizar el estilo del botón al hacer scroll
        window.addEventListener('scroll', updateFaqButtonStyle);
        
        // Actualizar el estilo del botón al redimensionar la ventana
        window.addEventListener('resize', updateFaqButtonStyle);
    }
}); 