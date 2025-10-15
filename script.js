// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navMenu.contains(event.target);
      const isClickOnToggle = navToggle.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Add intersection observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all slide-up elements
document.querySelectorAll('.slide-up').forEach(el => {
  observer.observe(el);
});

// Form submission handling (for contact form)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    // The form will submit normally to FormSubmit.co
    // You can add loading state here if desired
    const submitButton = this.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
    }
  });
}

/* ============================================
   PREMIUM AGENCY ENHANCEMENTS
   ============================================ */

// Statistics Counter Animation
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.round(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current);
    }
  }, 16);
}

// Vertical Stats Bar Animation
const verticalStatsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const barFill = document.getElementById('statsBarFill');
      const milestones = entry.target.querySelectorAll('.stat-milestone');
      
      // Animate bar fill
      setTimeout(() => {
        barFill.style.height = '100%';
      }, 200);
      
      // Animate milestones sequentially
      milestones.forEach((milestone, index) => {
        setTimeout(() => {
          milestone.classList.add('active');
          
          // Animate counter for this milestone
          const counter = milestone.querySelector('[data-target]');
          if (counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target, 1000);
          }
        }, 800 + (index * 600)); // Stagger each milestone
      });
      
      verticalStatsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const verticalStatsSection = document.querySelector('.stats-section-vertical');
if (verticalStatsSection) {
  verticalStatsObserver.observe(verticalStatsSection);
}

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all other FAQs
    faqItems.forEach(otherItem => {
      otherItem.classList.remove('active');
    });
    
    // Toggle current FAQ
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Parallax Effect for Hero Logo
let heroLogo = document.getElementById('heroLogo');
if (heroLogo) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    
    if (scrolled < 500) { // Only apply effect near the top
      heroLogo.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Timeline Progress Animation
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('timeline-visible');
    }
  });
}, { threshold: 0.2 });

const timelineCards = document.querySelectorAll('.process-step-card');
timelineCards.forEach(card => {
  timelineObserver.observe(card);
});

// Animate Timeline Line Fill
const timelineLine = document.querySelector('.timeline-line');
if (timelineLine) {
  window.addEventListener('scroll', () => {
    const processSection = document.querySelector('.process-home-section');
    if (!processSection) return;
    
    const sectionTop = processSection.offsetTop;
    const sectionHeight = processSection.offsetHeight;
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    const scrollProgress = (scrolled + windowHeight - sectionTop) / sectionHeight;
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    
    timelineLine.style.background = `linear-gradient(to bottom, 
      var(--color-accent) ${clampedProgress * 100}%, 
      var(--color-border) ${clampedProgress * 100}%)`;
  });
}

// Enhanced Hover Effects for App Cards
const appCards = document.querySelectorAll('.app-card');
appCards.forEach(card => {
  card.addEventListener('mouseenter', function(e) {
    this.style.transform = 'translateY(-12px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function(e) {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Smooth Reveal Animation for Service Cards with Stagger
const serviceCards = document.querySelectorAll('.service-card');
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) rotate(0deg)';
      }, index * 150);
      serviceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

serviceCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px) rotate(-2deg)';
  card.style.transition = 'all 0.6s ease-out';
  serviceObserver.observe(card);
});

// Add subtle floating animation to benefit cards
const benefitCards = document.querySelectorAll('.benefit-card');
benefitCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Credibility Logo Animation
const clientLogo = document.querySelector('.client-logo');
if (clientLogo) {
  const logoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          entry.target.style.transition = 'all 0.6s ease-out';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1)';
        }, 100);
        
        logoObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  logoObserver.observe(clientLogo);
}

// Button Ripple Effect Enhancement
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .timeline-visible {
    animation: slideInFromLeft 0.6s ease-out forwards;
  }
  
  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(style);

// Smooth scroll performance optimization
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Trigger any scroll-dependent animations here
      ticking = false;
    });
    ticking = true;
  }
});

// Log initialization
console.log('🚀 Crescent Developments - Premium Agency Website Loaded');
console.log('✅ All interactive features initialized');
