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
        
        // Sections with purple background we want to detect
        const purpleSections = [
            document.querySelector('.hero'),               // Hero section
            document.querySelector('.approach'),           // Approach section
            document.querySelector('.contact')             // Contact section
        ].filter(section => section !== null); // Filter out null sections
        
        if (purpleSections.length > 0) {
            // Create an Intersection Observer to detect when the button overlaps with purple sections
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Button is over a purple section, change to white with purple text
                        faqButton.classList.add('on-purple');
                    } else {
                        // Check if the button is still overlapping with any purple section
                        const isOverAnyPurpleSection = purpleSections.some(section => {
                            const buttonRect = faqButton.getBoundingClientRect();
                            const sectionRect = section.getBoundingClientRect();
                            
                            return (
                                buttonRect.top < sectionRect.bottom &&
                                buttonRect.bottom > sectionRect.top
                            );
                        });
                        
                        if (!isOverAnyPurpleSection) {
                            // Button is not over any purple section, change back to default
                            faqButton.classList.remove('on-purple');
                        }
                    }
                });
            }, { threshold: 0.1 });
            
            // Observe each purple section
            purpleSections.forEach(section => {
                observer.observe(section);
            });
            
            // Also check on scroll for better responsiveness
            window.addEventListener('scroll', function() {
                const buttonRect = faqButton.getBoundingClientRect();
                
                const isOverPurpleSection = purpleSections.some(section => {
                    const sectionRect = section.getBoundingClientRect();
                    return (
                        buttonRect.top < sectionRect.bottom &&
                        buttonRect.bottom > sectionRect.top
                    );
                });
                
                if (isOverPurpleSection) {
                    faqButton.classList.add('on-purple');
                } else {
                    faqButton.classList.remove('on-purple');
                }
            });
        }
    }
});
