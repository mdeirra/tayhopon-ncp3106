// Portfolio JavaScript - Deirra

// Theme Toggle Functionality
let currentTheme = localStorage.getItem('theme') || 'light';
document.body.className = `theme-${currentTheme}`;
document.documentElement.classList.toggle('dark', currentTheme === 'dark'); // For Tailwind's dark mode class

function updateThemeIcon() {
    const themeIcon = document.getElementById('theme-icon');
    const mobileThemeIcon = document.getElementById('mobile-theme-icon');
    const lightIcon = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>`;
    const darkIcon = `<circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>`;
    if (themeIcon) themeIcon.innerHTML = currentTheme === 'light' ? lightIcon : darkIcon;
    if (mobileThemeIcon) mobileThemeIcon.innerHTML = currentTheme === 'light' ? lightIcon : darkIcon;
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.className = `theme-${currentTheme}`;
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

// Scroll to section functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = 64;
        const elementPosition = element.offsetTop - navHeight;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    document.getElementById('mobile-menu').classList.add('hidden');
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Update current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    const currentTimeSpan = document.getElementById('current-time');
    if (currentTimeSpan) {
        currentTimeSpan.textContent = timeString;
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const navContainer = document.getElementById('nav-container');
    const navContent = document.getElementById('nav-content');

    if (window.scrollY > 50) {
        navbar.classList.add('bg-[var(--nav-bg)]', 'backdrop-blur-md', 'shadow-lg');
        navbar.classList.remove('bg-transparent');
        navContainer.classList.remove('max-w-6xl');
        navContainer.classList.add('max-w-full');
        navContent.classList.remove('px-8', 'mx-4', 'rounded-2xl', 'backdrop-blur-md', 'shadow-lg', 'border');
        navContent.classList.add('px-4', 'rounded-none', 'border-b');
        navContent.style.background = 'transparent'; // Managed by navbar parent
        navContent.style.borderColor = 'var(--border-color)'; // Still need border color
    } else {
        navbar.classList.remove('bg-[var(--nav-bg)]', 'backdrop-blur-md', 'shadow-lg');
        navbar.classList.add('bg-transparent');
        navContainer.classList.add('max-w-6xl');
        navContainer.classList.remove('max-w-full');
        navContent.classList.add('px-8', 'mx-4', 'rounded-2xl', 'backdrop-blur-md', 'shadow-lg', 'border');
        navContent.classList.remove('px-4', 'rounded-none', 'border-b');
        navContent.style.background = 'var(--nav-bg)';
        navContent.style.borderColor = 'var(--border-color)';
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.getElementById('hero-carousel-track');
    const carouselItems = document.querySelectorAll('#hero-carousel-track .carousel-item');
    let currentIndex = 0;
    const totalItems = carouselItems.length;

    console.log('Carousel initialized:', { totalItems, carouselTrack, carouselItems });

    function updateCarousel() {
        const offset = -currentIndex * 33.333; // Use 33.333% for 3 items
        carouselTrack.style.transform = `translateX(${offset}%)`;
        console.log('Carousel updated:', { currentIndex, offset });
    }

    function moveCarousel(direction) {
        currentIndex += direction;
        if (currentIndex < 0) {
            currentIndex = totalItems - 1; // Loop to end
        } else if (currentIndex >= totalItems) {
            currentIndex = 0; // Loop to start
        }
        updateCarousel();
    }

    // Make moveCarousel available globally
    window.moveCarousel = moveCarousel;

    // Auto-advance disabled per user request
    // setInterval(() => {
    //     moveCarousel(1);
    // }, 4000);

    // Initial update
    updateCarousel();
});

// Fade-in-on-scroll functionality
const fadeInSections = document.querySelectorAll('.fade-in-section');
const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // 10% of the section must be visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

fadeInSections.forEach(section => {
    observer.observe(section);
});

// Modal functionality
function openModal(projectId) {
    document.getElementById(`${projectId}-modal`).style.display = 'block';
}

function closeModal(projectId) {
    document.getElementById(`${projectId}-modal`).style.display = 'none';
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}

// Accordion functionality
function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const svg = button.querySelector('svg');

    if (content.classList.contains('open')) {
        content.classList.remove('open');
        content.style.maxHeight = '0';
        button.classList.remove('open');
    } else {
        // Close all other open accordions
        document.querySelectorAll('.accordion-content.open').forEach(openContent => {
            openContent.classList.remove('open');
            openContent.style.maxHeight = '0';
            openContent.previousElementSibling.classList.remove('open');
        });

        content.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px'; // Set max-height to content height
        button.classList.add('open');
    }
}

// FAQ functionality
function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const icon = button.querySelector('.faq-icon');
    const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

    if (isOpen) {
        // Close FAQ
        answer.style.maxHeight = '0px';
        icon.style.transform = 'rotate(0deg)';
        button.classList.remove('active');
    } else {
        // Close all other FAQs first
        document.querySelectorAll('.faq-item').forEach(item => {
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-icon');
            const otherButton = item.querySelector('.faq-question');
            otherAnswer.style.maxHeight = '0px';
            otherIcon.style.transform = 'rotate(0deg)';
            otherButton.classList.remove('active');
        });

        // Open current FAQ
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
        button.classList.add('active');
    }
}

// Contact form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
        submitBtn.style.background = '#10b981';
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = 'var(--primary-gradient)';
            submitBtn.disabled = false;
            
            // Show confirmation alert
            alert('Thank you for your message! I\'ll get back to you within 24 hours.');
        }, 2000);
    }, 1500);
}

// Single-open, animated accordion for Education
const eduItems = Array.from(document.querySelectorAll('#educational-background [data-edu]'));
function eduClose(item){ const t=item.querySelector('.edu-trigger'), p=item.querySelector('.edu-panel'); t.setAttribute('aria-expanded','false'); item.removeAttribute('aria-current'); p.style.maxHeight = 0; }
function eduOpen(item){ const t=item.querySelector('.edu-trigger'), p=item.querySelector('.edu-panel'); t.setAttribute('aria-expanded','true'); item.setAttribute('aria-current','true'); p.style.maxHeight = p.scrollHeight + 'px'; }
function eduToggle(item){ const open = item.querySelector('.edu-trigger').getAttribute('aria-expanded')==='true'; eduItems.forEach(i=>i!==item&&eduClose(i)); open?eduClose(item):eduOpen(item); }
eduItems.forEach((item, i) => {
  const t=item.querySelector('.edu-trigger'), p=item.querySelector('.edu-panel'); p.style.maxHeight=0;
  t.addEventListener('click',()=>eduToggle(item));
  t.addEventListener('keydown',e=>{
    const idx=eduItems.indexOf(item);
    if(e.key==='ArrowDown'){e.preventDefault(); eduItems[(idx+1)%eduItems.length].querySelector('.edu-trigger').focus();}
    if(e.key==='ArrowUp'){e.preventDefault(); eduItems[(idx-1+eduItems.length)%eduItems.length].querySelector('.edu-trigger').focus();}
    if(e.key==='Enter'||e.key===' '){e.preventDefault(); eduToggle(item);}
  });
  if(i===0) requestAnimationFrame(()=>eduOpen(item));
});
window.addEventListener('resize',()=>{const cur=document.querySelector('#educational-background .edu-item[aria-current="true"] .edu-panel'); if(cur){cur.style.maxHeight=cur.scrollHeight+'px';}});

// Seminars accordion functionality
(() => {
  const items = Array.from(document.querySelectorAll('#seminars [data-edu]'));
  if (!items.length) return;

  const close = (item) => {
    const t = item.querySelector('.edu-trigger');
    const p = item.querySelector('.edu-panel');
    t.setAttribute('aria-expanded','false');
    item.removeAttribute('aria-current');
    p.style.maxHeight = 0;
  };
  const open = (item) => {
    const t = item.querySelector('.edu-trigger');
    const p = item.querySelector('.edu-panel');
    t.setAttribute('aria-expanded','true');
    item.setAttribute('aria-current','true');
    p.style.maxHeight = p.scrollHeight + 'px';
  };
  const toggle = (item) => {
    const isOpen = item.querySelector('.edu-trigger').getAttribute('aria-expanded') === 'true';
    items.forEach(i => i !== item && close(i));
    isOpen ? close(item) : open(item);
  };

  items.forEach((item, i) => {
    const t = item.querySelector('.edu-trigger');
    const p = item.querySelector('.edu-panel');
    p.style.maxHeight = 0;

    t.addEventListener('click', () => toggle(item));
    t.addEventListener('keydown', (e) => {
      const idx = items.indexOf(item);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length].querySelector('.edu-trigger').focus(); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); items[(idx - 1 + items.length) % items.length].querySelector('.edu-trigger').focus(); }
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(item); }
    });

    if (i === 0) requestAnimationFrame(() => open(item));
  });

  window.addEventListener('resize', () => {
    const openPanel = document.querySelector('#seminars .edu-item[aria-current="true"] .edu-panel');
    if (openPanel) openPanel.style.maxHeight = openPanel.scrollHeight + 'px';
  });
})();

// Project slider functionality
function initProjectSliders(){
    document.querySelectorAll('.pmodal-slider').forEach(slider=>{
      const imgs = JSON.parse(slider.dataset.images || '[]');
      const imgEl = slider.querySelector('img');
      const set = (i)=>{ if(!imgs.length) return; slider.dataset.index = i; imgEl.src = imgs[i]; };
      slider.closest('.pmodal-frame').querySelector('[data-prev]')?.addEventListener('click', e=>{
        e.stopPropagation(); if(!imgs.length) return;
        const i = (+slider.dataset.index + imgs.length - 1) % imgs.length; set(i);
      });
      slider.closest('.pmodal-frame').querySelector('[data-next]')?.addEventListener('click', e=>{
        e.stopPropagation(); if(!imgs.length) return;
        const i = (+slider.dataset.index + 1) % imgs.length; set(i);
      });
      if (imgs.length) set(0);
    });
}

// Manual accordion functionality (no Bootstrap JS needed)
document.addEventListener('DOMContentLoaded', function() {
    console.log('Accordion script loaded');
    
    const buttons = document.querySelectorAll('.accordion-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-bs-target');
            const collapse = document.querySelector(target);
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other accordions
            document.querySelectorAll('.accordion-collapse').forEach(item => {
                if (item !== collapse) {
                    item.classList.remove('show');
                    item.style.display = 'none';
                }
            });
            document.querySelectorAll('.accordion-button').forEach(btn => {
                if (btn !== this) {
                    btn.setAttribute('aria-expanded', 'false');
                    btn.classList.add('collapsed');
                }
            });
            
            // Toggle current accordion
            if (isExpanded) {
                collapse.classList.remove('show');
                collapse.style.display = 'none';
                this.setAttribute('aria-expanded', 'false');
                this.classList.add('collapsed');
            } else {
                collapse.classList.add('show');
                collapse.style.display = 'block';
                this.setAttribute('aria-expanded', 'true');
                this.classList.remove('collapsed');
            }
        });
    });
    
    const accordionItems = document.querySelectorAll('.accordion-item');
    console.log('Found accordion items:', accordionItems.length);
    
    accordionItems.forEach((item, index) => {
        const button = item.querySelector('.accordion-button');
        const collapse = item.querySelector('.accordion-collapse');
        
        console.log(`Item ${index}:`, {
            button: !!button,
            collapse: !!collapse,
            collapseId: collapse?.id,
            target: button?.getAttribute('data-bs-target')
        });
        
        if (button && collapse) {
            // Listen for Bootstrap collapse events
            collapse.addEventListener('show.bs.collapse', function() {
                console.log('Showing collapse:', this.id);
                // Remove active class from all items
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                // Add active class to current item
                item.classList.add('active');
            });
            
            collapse.addEventListener('hide.bs.collapse', function() {
                console.log('Hiding collapse:', this.id);
                item.classList.remove('active');
            });
        }
    });

    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, var(--primary-bg), var(--primary-text))';
            this.style.color = 'white';
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #f3f4f6, #e5e7eb)';
            this.style.color = 'var(--text-primary)';
            this.style.transform = 'scale(1)';
        });
    });
});

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle listeners
    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('mobile-theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('mobile-menu-toggle')?.addEventListener('click', toggleMobileMenu);
    
    // Scroll listener
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Project slider initialization
    window.addEventListener('load', initProjectSliders);
    
    // Initialize
    updateTime();
    setInterval(updateTime, 60000);
    handleNavbarScroll();
    updateThemeIcon(); // Set initial icon based on theme
});

// AOS initialization (will be called after AOS script loads)
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: false,
            offset: 100
        });
    }
}
