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

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

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
  const filterBtns = document.querySelectorAll('.skills-filter-wrapper .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

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
  const filterBtns = document.querySelectorAll('.project-filters .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

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
    title: 'DNSC Student Information & Academic Portal',
    category: 'Full Stack Academic System',
    image: 'assets/images/project-dnsc.jpg',
    description:
      'A comprehensive web application designed for Davao del Norte State College students and instructors. Built using PHP, MySQL, and vanilla JavaScript, it facilitates student course pre-enrollment, real-time GPA trend computation, exam schedules, and curriculum checklist auditing.',
    technologies: ['PHP', 'MySQL', 'JavaScript (ES6)', 'HTML5', 'CSS3', 'Chart.js'],
    features: [
      'Automated prerequisite validation engine preventing invalid enrollments',
      'Interactive student dashboard with GPA calculations & academic milestones',
      'Instructor module for grading submissions and attendance reporting',
      'Responsive design tested on mobile phones, tablets, and desktop workstations',
      'Robust SQL injection prevention with prepared PDO statements'
    ],
    github: 'https://github.com/url-izx/PersonalCV-Vercel',
    demo: '#'
  },
  2: {
    title: 'BarangayConnect - Resident Records & E-Services',
    category: 'E-Governance & Community System',
    image: 'assets/images/project-barangay.jpg',
    description:
      'An automated barangay administrative platform developed to eliminate paper-based record-keeping in local government units. Features family profiling, automated barangay clearance/residency certificate issuance, and incident blotter tracking.',
    technologies: ['PHP 8', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'FPDF Library'],
    features: [
      'Resident census registry with Purok categorization and verified ID badges',
      'One-click Barangay Clearance & Certificate of Indigency PDF generation',
      'Role-based access control for Barangay Captain, Secretary, and Staff',
      'Real-time search and filter with instant status indicators'
    ],
    github: 'https://github.com/url-izx/PersonalCV-Vercel',
    demo: '#'
  },
  3: {
    title: 'Aura POS & Smart Inventory System',
    category: 'Web App & Inventory Management',
    image: 'assets/images/project-inventory.jpg',
    description:
      'A high-performance modern Point-of-Sale and inventory management application. Tailored for small to medium enterprises with automated low-stock notifications, transaction logs, receipt generator, and daily sales metrics.',
    technologies: ['HTML5', 'CSS3 (Flexbox/Grid)', 'JavaScript', 'PHP REST API', 'MySQL'],
    features: [
      'Interactive product catalog grid with instant search and category tags',
      'Real-time automated stock level calculation and threshold alerts',
      'Thermal receipt preview modal with one-click print and email dispatch',
      'Interactive sales performance trend visualization'
    ],
    github: 'https://github.com/url-izx/PersonalCV-Vercel',
    demo: '#'
  },
  4: {
    title: 'Personal CV & Developer Portfolio (Vercel Edition)',
    category: 'Portfolio & Curriculum Vitae',
    image: 'assets/images/project-dnsc.jpg',
    description:
      'An interactive, accessible, and responsive personal CV web application deployed on Vercel. Features sleek dark/light theme switching, animated skill bars, project modal popups, and full print-to-PDF support.',
    technologies: ['HTML5', 'Vanilla CSS3', 'JavaScript', 'PHP Backend', 'Vercel Deployment'],
    features: [
      'Zero-dependency modern Vanilla CSS design system with fluid layout',
      'Dynamic dark/light mode toggle stored in browser localStorage',
      'Optimized print stylesheet for instant clean CV export',
      'Live deployment ready on Vercel'
    ],
    github: 'https://github.com/url-izx/PersonalCV-Vercel',
    demo: 'https://github.com/url-izx/PersonalCV-Vercel'
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
  printBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });
}
