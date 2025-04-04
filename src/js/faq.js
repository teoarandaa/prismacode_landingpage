document.addEventListener('DOMContentLoaded', function() {
    const faqButton = document.getElementById('faqButton');
    
    if (faqButton) {
        // Handle click event
        faqButton.addEventListener('click', function() {
            // Scroll to the frequently asked questions section or open a modal
            // For now, we'll just scroll to the contact section as a placeholder
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth'
            });
            
            // In the future, you can implement a FAQ modal that appears when clicked
            // Example:
            // const faqModal = document.getElementById('faqModal');
            // faqModal.style.display = 'block';
        });
    }
});
