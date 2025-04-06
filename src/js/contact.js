/**
 * Script para manejar el formulario de contacto mediante EmailJS
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS
    emailjs.init('G2ecB_9d5Am3sZeyN'); // Reemplazar con tu clave pública de EmailJS
    
    // Referencias a elementos del DOM
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Mostrar indicador de carga
            formStatus.textContent = 'Enviando...';
            formStatus.className = 'form-status';
            
            // Parámetros para el servicio de email
            const serviceID = 'service_y79dlvb';   // Reemplazar con tu ID de servicio de EmailJS
            const templateID = 'template_02xg9nc'; // Reemplazar con tu ID de plantilla de EmailJS
            
            // Preparar datos del formulario para envío
            const formData = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                subject: contactForm.subject.value,
                message: contactForm.message.value
            };
            
            // Enviar email
            emailjs.send(serviceID, templateID, formData)
                .then(() => {
                    // Mostrar mensaje de éxito
                    formStatus.textContent = '¡Mensaje enviado con éxito!';
                    formStatus.className = 'form-status success';
                    
                    // Restablecer formulario
                    contactForm.reset();
                    
                    // Quitar el mensaje después de un tiempo
                    setTimeout(() => {
                        formStatus.textContent = '';
                        formStatus.className = 'form-status';
                    }, 5000);
                })
                .catch((err) => {
                    // Mostrar mensaje de error
                    formStatus.textContent = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.';
                    formStatus.className = 'form-status error';
                    console.error('Error al enviar el email:', err);
                });
        });
    }
}); 