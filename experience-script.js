// Add smooth animations to accordion items
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const collapse = item.querySelector('.accordion-collapse');
        
        button.addEventListener('click', function() {
            // Remove active and blurred classes from all items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.classList.remove('blurred');
            });
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Add blurred class to other items if this one is expanded
            if (collapse.classList.contains('show')) {
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.add('blurred');
                    }
                });
            }
        });
    });
    
    // Listen for Bootstrap collapse events
    accordionItems.forEach(item => {
        const collapse = item.querySelector('.accordion-collapse');
        
        collapse.addEventListener('shown.bs.collapse', function() {
            // Add blurred class to other items when this one is shown
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.add('blurred');
                }
            });
        });
        
        collapse.addEventListener('hidden.bs.collapse', function() {
            // Remove blurred class from all items when this one is hidden
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('blurred');
            });
        });
    });
});

