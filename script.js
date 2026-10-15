/**
 * Sachin Saravanan — Premium Animated Developer Portfolio
 * Vanilla JavaScript: ScrollSpy, Scroll-Triggered Reveals, Typing Animation,
 * Navigation Interactivity, Clipboard Helper, and Performance Optimizations.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Accessibility & Motion Preferences Check
  // -------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------------------------
  // 2. Dynamic Copyright Year
  // -------------------------------------------------------------------------
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------------------------
  // 3. Scroll Progress Indicator & Navbar Sticky State
  // -------------------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scrollProgress');
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  let ticking = false;

  const updateScrollState = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Update progress bar width
    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Toggle navbar shadow / dark glass styling
    if (navbarWrapper) {
      if (scrollTop > 40) {
        navbarWrapper.classList.add('navbar-scrolled');
      } else {
        navbarWrapper.classList.remove('navbar-scrolled');
      }
    }

    // Back to top button visibility
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      if (scrollTop > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0.7';
      }
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  }, { passive: true });

  // Initial call
  updateScrollState();

  // -------------------------------------------------------------------------
  // 4. Mobile Navigation Drawer & Hamburger Toggle
  // -------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');

  const closeMobileMenu = () => {
    if (hamburgerBtn && navLinks) {
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  const toggleMobileMenu = () => {
    const isOpen = hamburgerBtn.classList.toggle('is-active');
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    navLinks.classList.toggle('is-open', isOpen);
    // Prevent background scrolling when mobile drawer is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  // Close menu when clicking any nav link
  navItems.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close menu on pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navLinks && 
      navLinks.classList.contains('is-open') && 
      !navLinks.contains(e.target) && 
      !hamburgerBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // -------------------------------------------------------------------------
  // 5. Active Section Indicator (ScrollSpy)
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === `#${currentId}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  // -------------------------------------------------------------------------
  // 6. Scroll-Triggered Reveal Animations (IntersectionObserver)
  // -------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Stay visible once revealed
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not available or reduced-motion is requested
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // -------------------------------------------------------------------------
  // 7. Hero Typing Animation
  // -------------------------------------------------------------------------
  const typingElement = document.getElementById('typingText');
  const phrases = [
    'Aspiring Full Stack Developer',
    'Data Analytics Enthusiast'
  ];

  if (typingElement && !prefersReducedMotion) {
    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let isDeleting = true;
    let typingSpeed = 90;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 85;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at full word
        isDeleting = true;
        typingSpeed = 2400;
      } else if (isDeleting && charIndex === 0) {
        // Switch to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    };

    // Initial pause before deleting first text
    setTimeout(typeLoop, 2200);
  }

  // -------------------------------------------------------------------------
  // 8. Copy Email to Clipboard with Toast Notification
  // -------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  const showToast = (message) => {
    if (!toastNotification) return;
    if (toastMessage) {
      toastMessage.textContent = message;
    }
    toastNotification.classList.add('is-visible');

    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('is-visible');
    }, 3200);
  };

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'sachin2605srs@gmail.com';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback method
          const tempInput = document.createElement('textarea');
          tempInput.value = email;
          tempInput.style.position = 'fixed';
          tempInput.style.opacity = '0';
          document.body.appendChild(tempInput);
          tempInput.focus();
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        showToast('Email copied to clipboard: ' + email);
      } catch (err) {
        showToast('Direct email: ' + email);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 9. Client-Side Quick Mail Assistant (No Fake Form Submission)
  // -------------------------------------------------------------------------
  const launchMailClientBtn = document.getElementById('launchMailClientBtn');
  const senderNameInput = document.getElementById('senderName');
  const mailSubjectInput = document.getElementById('mailSubject');
  const mailMessageInput = document.getElementById('mailMessage');

  if (launchMailClientBtn) {
    launchMailClientBtn.addEventListener('click', () => {
      const name = senderNameInput ? senderNameInput.value.trim() : '';
      const subject = mailSubjectInput ? mailSubjectInput.value.trim() : '';
      const message = mailMessageInput ? mailMessageInput.value.trim() : '';

      const recipient = 'sachin2605srs@gmail.com';
      const fullSubject = encodeURIComponent(subject ? `[Portfolio Contact] ${subject}` : 'Inquiry from Portfolio');
      
      let fullBody = '';
      if (name) {
        fullBody += `Hello Sachin,\n\nMy name is ${name}.\n\n`;
      }
      if (message) {
        fullBody += `${message}\n\n`;
      }
      fullBody += `Best regards,\n${name || 'A Website Visitor'}`;

      const encodedBody = encodeURIComponent(fullBody);
      const mailtoUri = `mailto:${recipient}?subject=${fullSubject}&body=${encodedBody}`;

      // Open email client
      window.location.href = mailtoUri;
      showToast('Opening your default email client...');
    });
  }

  // -------------------------------------------------------------------------
  // 10. Back to Top Smooth Scroll
  // -------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

});
