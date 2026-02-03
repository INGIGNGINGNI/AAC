/*
Name: 			accordion-image
Version: 		1.0.0
Description:    Handle accordion image hover functionality
*/

document.addEventListener('DOMContentLoaded', function() {
    // Get all tab-accordion elements
    const tabAccordions = document.querySelectorAll('.tab-accordion');
    
    // Add hover event listeners to each tab-accordion
    tabAccordions.forEach(function(tab) {
        // Mouse enter event
        tab.addEventListener('mouseenter', function() {
            // Remove active class from all tabs
            tabAccordions.forEach(function(accordion) {
                accordion.classList.remove('active');
            });
            
            // Add active class to the hovered tab
            this.classList.add('active');
        });
        
        // Mouse leave event - restore default active state (first tab)
        tab.addEventListener('mouseleave', function() {
            // Remove active class from all tabs
            tabAccordions.forEach(function(accordion) {
                accordion.classList.remove('active');
            });
            
            // Add active class back to the first tab (default)
            if (tabAccordions.length > 0) {
                tabAccordions[0].classList.add('active');
            }
        });
    });
}); 