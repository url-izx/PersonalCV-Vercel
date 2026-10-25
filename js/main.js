/**
 * Personal CV Interactive Engine
 * Student: Earl Laurence R. Masana
 * Course: BSIT 4th Year - Davao del Norte State College
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbarScroll();
  initMobileMenu();
  initScrollSpy();
  initScrollAnimations();
  initSkillProgress();
  initSkillFilter();
  initProjectFilter();
  initProjectModal();
  initClipboardButtons();
  initContactForm();
  initBackToTop();
  initPrintButton();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light) with LocalStorage
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('cv_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcons(storedTheme);

  themeToggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('cv_theme', nextTheme);
      updateThemeIcons(nextTheme);
    });
  });

  function updateThemeIcons(theme) {
    themeToggleBtns.forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'light') {
          icon.className = 'fa-solid fa-moon';
          btn.setAttribute('title', 'Switch to Dark Mode');
        } else {
          icon.className = 'fa-solid fa-sun';
          btn.setAttribute('title', 'Switch to Light Mode');
        }
      }
    });
  }
}

/* ==========================================================================
   2. Sticky Navbar & Header Blur
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   3. Mobile Drawer Navigation
   ========================================================================== */
function initMobileMenu() {
  const hamburgerBtn = document.querySelector('.nav-hamburger');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileDrawer) return;

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    const icon = hamburgerBtn.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close drawer when any mobile link is clicked
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      const icon = hamburgerBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileDrawer.contains(e.target) && !hamburgerBtn.contains(e.target) && mobileDrawer.classList.contains('open')) {
      mobileDrawer.classList.remove('open');
      const icon = hamburgerBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    }
  });
}

/* ==========================================================================
   4. ScrollSpy - Active Nav Link Highlight
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const dockItems = document.querySelectorAll('.main-bottom-nav__item');

  const onScroll = () => {
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });

        dockItems.forEach((item) => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   5. Scroll-Based Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is unsupported
    revealElements.forEach((el) => el.classList.add('visible'));
  }
}

/* ==========================================================================
   6. Animated Skill Progress Indicators
   ========================================================================== */
function initSkillProgress() {
  const skillSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.progress-bar-fill');

  if (!skillSection || progressBars.length === 0) return;

  let animated = false;

  const triggerProgress = () => {
    progressBars.forEach((bar) => {
      const progress = bar.getAttribute('data-progress') || '80';
      bar.style.width = `${progress}%`;
    });
    animated = true;
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          triggerProgress();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(skillSection);
  } else {
    triggerProgress();
  }
}

/* ==========================================================================
   7. Skill Category Filter
   ========================================================================== */
function initSkillFilter() {
  const filterBtns = document.querySelectorAll('#skills .filter-tab, #skills .filter-btn');
  const skillCards = document.querySelectorAll('#skills .arsenal-card, #skills .skill-card');

  if (filterBtns.length === 0 || skillCards.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCat === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   8. Projects Filter
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('#projects .filter-btn');
  const projectCards = document.querySelectorAll('#projects .project-card');

  if (filterBtns.length === 0 || projectCards.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const tags = (card.getAttribute('data-tags') || '').split(' ');
        if (filter === 'all' || tags.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   9. Interactive Project Modal
   ========================================================================== */
const projectDetailsData = {
  1: {
    title: 'QUESTLEARN: A REINFORCEMENT-BASED GAMIFIED LEARNING PATTERN ANALYSIS SYSTEM FOR ELEMENTARY ENGLISH BASED ON NATG6 STANDARDIZED ASSESSMENTS',
    category: 'BSIT Flagship Academic Capstone Research',
    image: 'assets/images/questlearn.png',
    description:
      'An educational technology web platform engineered for elementary English education at Davao del Norte State College. It combines reinforcement-based gamified pedagogical mechanics with real-time student learning pattern analysis, benchmarked against National Achievement Test Grade 6 (NATG6) standardized competencies.',
    technologies: ['PHP', 'MySQL', 'JavaScript (ES6)', 'HTML5', 'CSS3', 'Pattern Analytics', 'Gamification Engine'],
    features: [
      'Reinforcement-based gamified quest progression, challenge levels, and achievement rewards',
      'Automated assessment modules directly mapped to NATG6 elementary English standards',
      'Intelligent learning pattern detection tracking student error tendencies, completion times, and concept retention',
      'Centralized educator & administrator portal for student performance evaluation and report generation',
      'Robust relational database architecture with prepared PDO queries and responsive multi-device interface'
    ],
    github: 'https://github.com/gentilesjaydev/questlearnadmin',
    demo: 'https://github.com/gentilesjaydev/questlearnadmin'
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalGithubLink = document.getElementById('modalGithubLink');

  if (!modalOverlay) return;

  const openModal = (id) => {
    const data = projectDetailsData[id];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDesc.textContent = data.description;

    // Render Tech Pills
    modalTechStack.innerHTML = data.technologies
      .map((tech) => `<span class="tech-pill">${tech}</span>`)
      .join('');

    // Render Features List
    modalFeatures.innerHTML = data.features
      .map((feat) => `<li><i class="fa-solid fa-check"></i> ${feat}</li>`)
      .join('');

    if (modalGithubLink) {
      modalGithubLink.href = data.github;
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Attach click listeners to cards' "Details" triggers
  document.querySelectorAll('.open-project-modal').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      openModal(projectId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   10. Copy to Clipboard
   ========================================================================== */
function initClipboardButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-clipboard-text') || 'earlmasana1@gmail.com';
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = 'fa-solid fa-check';
          setTimeout(() => {
            icon.className = 'fa-regular fa-copy';
          }, 2000);
        }
      });
    });
  });
}

/* ==========================================================================
   11. Contact Form (PHP Integration with Graceful Fallback)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    const name = form.querySelector('#senderName').value.trim();
    const email = form.querySelector('#senderEmail').value.trim();
    const subject = form.querySelector('#senderSubject').value.trim();
    const message = form.querySelector('#senderMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    const formData = { name, email, subject, message };

    try {
      // Attempt sending to PHP endpoint
      const response = await fetch('backend/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        showToast(result.message || 'Message sent successfully!');
        form.reset();
      } else {
        throw new Error('Server returned error status');
      }
    } catch (err) {
      // In static deployment (e.g., standard Vercel static), gracefully acknowledge & offer mailto
      console.info('PHP endpoint unreachable (static host), utilizing interactive fallback.');
      showToast(`Thank you, ${name}! Your inquiry has been noted. Opening email client...`);
      setTimeout(() => {
        const mailtoLink = `mailto:earlmasana1@gmail.com?subject=${encodeURIComponent(
          subject || 'CV Inquiry'
        )}&body=${encodeURIComponent(`Hi Earl,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
        window.location.href = mailtoLink;
      }, 1200);
      form.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

/* ==========================================================================
   12. Toast Notification Helper
   ========================================================================== */
function showToast(message, type = 'success') {
  let toast = document.getElementById('cvToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cvToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  const icon = type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   13. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   14. Print CV Action
   ========================================================================== */
function initPrintButton() {
  const printBtns = document.querySelectorAll('.btn-print-cv');

  const prepareForPrint = () => {
    // Reveal all elements and fill progress bars before printing
    document.querySelectorAll('.fade-up').forEach((el) => {
      el.classList.add('visible');
    });
    document.querySelectorAll('.progress-bar-fill').forEach((bar) => {
      bar.style.width = `${bar.getAttribute('data-progress') || 80}%`;
    });
  };

  window.addEventListener('beforeprint', prepareForPrint);

  printBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      prepareForPrint();
      setTimeout(() => {
        window.print();
      }, 80);
    });
  });
}
