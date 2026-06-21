// ============================================================
// 0. WAIT FOR DOM
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

// ============================================================
// 1. LENIS SMOOTH SCROLL
// ============================================================
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect Lenis to GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }
}

// ============================================================
// 2. GSAP + SCROLLTRIGGER SETUP
// ============================================================
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // ----------------------------------------------------------
  // 2A. HERO ENTRANCE — Cinematic stagger
  // ----------------------------------------------------------
  const heroTl = gsap.timeline({ delay: 0.3 });

  heroTl
    .to('.hero__label', {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'
    })
    .to('.hero__title', {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out'
    }, '-=0.5')
    .to('.hero__desc', {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'
    }, '-=0.5')
    .to('.hero__cta-group', {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out'
    }, '-=0.4')
    .to('.hero__mockup', {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out'
    }, '-=0.7')
    .from('.hero__float-card--top', {
      opacity: 0, x: 40, duration: 0.7, ease: 'back.out(1.4)'
    }, '-=0.4')
    .from('.hero__float-card--bottom', {
      opacity: 0, x: -40, duration: 0.7, ease: 'back.out(1.4)'
    }, '-=0.5')
    .from('.geo', {
      opacity: 0, scale: 0, rotation: -90, duration: 0.6,
      ease: 'back.out(1.7)', stagger: 0.1
    }, '-=0.8');

  // ----------------------------------------------------------
  // 2B. STATS PILLS — Slide in from bottom with stagger
  // ----------------------------------------------------------
  gsap.from('.logo-pill', {
    scrollTrigger: {
      trigger: '.publication',
      start: 'top 80%',
    },
    y: 40, opacity: 0, duration: 0.6,
    stagger: 0.1, ease: 'power2.out',
    clearProps: 'all'
  });

  // ----------------------------------------------------------
  // 2C. ABOUT SECTION — Split reveal
  // ----------------------------------------------------------
  gsap.from('.feature-a__content', {
    scrollTrigger: {
      trigger: '.feature-a',
      start: 'top 70%',
    },
    x: -60, opacity: 0, duration: 1, ease: 'power3.out'
  });

  gsap.from('.feature-a__geo .fa-geo', {
    scrollTrigger: {
      trigger: '.feature-a',
      start: 'top 70%',
    },
    scale: 0, rotation: 180, opacity: 0, duration: 0.8,
    stagger: 0.12, ease: 'back.out(1.5)'
  });

  gsap.from('.feature__list li', {
    scrollTrigger: {
      trigger: '.feature__list',
      start: 'top 85%',
    },
    x: -30, opacity: 0, duration: 0.5,
    stagger: 0.1, ease: 'power2.out'
  });

  // ----------------------------------------------------------
  // 2D. EDUCATION SECTION — Image clip-path + content slide
  // ----------------------------------------------------------
  gsap.from('.feature-b__image > img', {
    scrollTrigger: {
      trigger: '.feature-b',
      start: 'top 70%',
    },
    clipPath: 'inset(100% 0 0 0)',
    duration: 1.2, ease: 'power4.inOut'
  });

  gsap.from('.feature-b__card', {
    scrollTrigger: {
      trigger: '.feature-b',
      start: 'top 60%',
    },
    y: 80, opacity: 0, duration: 0.8, delay: 0.5, ease: 'power3.out'
  });

  gsap.from('.feature-b__content > *', {
    scrollTrigger: {
      trigger: '.feature-b__content',
      start: 'top 75%',
    },
    y: 30, opacity: 0, duration: 0.6,
    stagger: 0.1, ease: 'power2.out'
  });

  // ----------------------------------------------------------
  // 2E. EXPERIENCE TIMELINE — Stagger from left
  // ----------------------------------------------------------
  gsap.from('.experience-header > *', {
    scrollTrigger: {
      trigger: '.experience-header',
      start: 'top 80%',
    },
    y: 30, opacity: 0, duration: 0.7,
    stagger: 0.15, ease: 'power2.out'
  });

  const timelineItems = document.querySelectorAll('.timeline__item');
  timelineItems.forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
      x: -50, opacity: 0, duration: 0.7,
      delay: i * 0.1, ease: 'power3.out',
      onComplete: () => item.classList.add('is-visible')
    });

    // Animate the dot separately with a pop effect
    gsap.from(item.querySelector('.timeline__dot'), {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
      scale: 0, duration: 0.4,
      delay: i * 0.1 + 0.3, ease: 'back.out(3)'
    });
  });

  // Timeline line drawing effect
  gsap.from('.timeline::before', {
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 80%',
      end: 'bottom 40%',
      scrub: 1,
    },
    scaleY: 0, transformOrigin: 'top center'
  });

  // ----------------------------------------------------------
  // 2F. QUOTE SECTION — Fade in with scale
  // ----------------------------------------------------------
  gsap.from('.testimonial__quote', {
    scrollTrigger: {
      trigger: '.testimonial',
      start: 'top 75%',
    },
    y: 40, opacity: 0, scale: 0.95, duration: 1, ease: 'power3.out'
  });

  gsap.from('.testimonial__avatar', {
    scrollTrigger: {
      trigger: '.testimonial',
      start: 'top 75%',
    },
    scale: 0, duration: 0.6, delay: 0.5, ease: 'back.out(2)'
  });

  // ----------------------------------------------------------
  // 2G. PROJECT CARDS — Stagger from bottom with rotation
  // ----------------------------------------------------------
  gsap.from('.blog__header > *', {
    scrollTrigger: {
      trigger: '.blog__header',
      start: 'top 80%',
    },
    y: 30, opacity: 0, duration: 0.7,
    stagger: 0.12, ease: 'power2.out'
  });

  gsap.from('.blog__grid .card', {
    scrollTrigger: {
      trigger: '.blog__grid',
      start: 'top 80%',
    },
    y: 60, opacity: 0, rotationY: 15, duration: 0.8,
    stagger: 0.15, ease: 'power3.out'
  });

  // ----------------------------------------------------------
  // 2G-2. DESIGN SHOWCASE — Header reveal
  // ----------------------------------------------------------
  gsap.from('.design-showcase__header > *', {
    scrollTrigger: {
      trigger: '.design-showcase__header',
      start: 'top 80%',
    },
    y: 30, opacity: 0, duration: 0.7,
    stagger: 0.12, ease: 'power2.out'
  });

  // ----------------------------------------------------------
  // 2H. SKILLS SECTION — Scale pop with stagger
  // ----------------------------------------------------------
  gsap.from('.skills__header > *', {
    scrollTrigger: {
      trigger: '.skills__header',
      start: 'top 80%',
    },
    y: 30, opacity: 0, duration: 0.7,
    stagger: 0.12, ease: 'power2.out'
  });

  gsap.from('.skill-card', {
    scrollTrigger: {
      trigger: '.skills__grid',
      start: 'top 80%',
    },
    y: 40, opacity: 0, scale: 0.8, duration: 0.6,
    stagger: 0.08, ease: 'back.out(1.4)'
  });

  // Skill bar fill with ScrollTrigger
  document.querySelectorAll('.skill-card__fill').forEach(bar => {
    gsap.to(bar, {
      scrollTrigger: {
        trigger: bar,
        start: 'top 90%',
      },
      width: bar.style.getPropertyValue('--fill'),
      duration: 1.2, ease: 'power2.out', delay: 0.3
    });
  });

  // ----------------------------------------------------------
  // 2I. CONTACT SECTION
  // ----------------------------------------------------------
  gsap.from('.cta-section__inner > *', {
    scrollTrigger: {
      trigger: '.cta-section',
      start: 'top 75%',
    },
    y: 30, opacity: 0, duration: 0.6,
    stagger: 0.1, ease: 'power2.out'
  });

  gsap.from('.cta-section__social a', {
    scrollTrigger: {
      trigger: '.cta-section__social',
      start: 'top 90%',
    },
    y: 20, opacity: 0, scale: 0, duration: 0.5,
    stagger: 0.08, ease: 'back.out(2)'
  });

  // ----------------------------------------------------------
  // 2J. FOOTER
  // ----------------------------------------------------------
  gsap.from('.footer__col', {
    scrollTrigger: {
      trigger: '.footer__top',
      start: 'top 85%',
    },
    y: 30, opacity: 0, duration: 0.6,
    stagger: 0.1, ease: 'power2.out'
  });

  // ----------------------------------------------------------
  // 2K. PARALLAX EFFECTS (scrub-based)
  // ----------------------------------------------------------
  gsap.to('.geo--circle-outline', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
    y: 100, rotation: 45, ease: 'none'
  });

  gsap.to('.geo--square-filled', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    y: 80, rotation: 90, ease: 'none'
  });

  gsap.to('.geo--tri-right', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
    },
    y: 60, rotation: -30, ease: 'none'
  });

  // Hero photo parallax
  gsap.to('.hero__photo-frame img', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    y: 50, scale: 1.1, ease: 'none'
  });

  // Section pinning on publication stats
  gsap.from('.publication__inner', {
    scrollTrigger: {
      trigger: '.publication',
      start: 'top 80%',
      end: 'top 30%',
      scrub: 1,
    },
    y: 30, opacity: 0.5
  });

} // end GSAP check

// ============================================================
// 3. TSPARTICLES — Floating dots in hero
// ============================================================
if (typeof tsParticles !== 'undefined') {
  tsParticles.load('hero-particles', {
    fullScreen: { enable: false },
    particles: {
      number: {
        value: 50,
        density: { enable: true, value_area: 900 }
      },
      color: { value: ['#c8a96e', '#888880', '#0d0d0d'] },
      shape: { type: ['circle'] },
      opacity: {
        value: 0.25,
        random: true,
        animation: { enable: true, speed: 0.5, minimumValue: 0.05, sync: false }
      },
      size: {
        value: { min: 2, max: 5 },
        random: true,
        animation: { enable: true, speed: 1, minimumValue: 1, sync: false }
      },
      move: {
        enable: true,
        speed: 0.6,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'out' },
      },
      links: {
        enable: true,
        distance: 140,
        color: '#c8a96e',
        opacity: 0.08,
        width: 1,
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
      },
      modes: {
        grab: { distance: 160, links: { opacity: 0.2 } },
        push: { quantity: 3 },
      },
    },
    detectRetina: true,
  });
}

// ============================================================
// 4. HAMBURGER MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
    });
  });
}

// ============================================================
// 5. NAVBAR SCROLL SHADOW
// ============================================================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 2px 16px rgba(0,0,0,0.10)'
      : 'none';
  }
});

// ============================================================
// 6. SCROLL PROGRESS BAR
// ============================================================
const scrollProgress = document.getElementById('scroll-progress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = progress + '%';
}
window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();

// ============================================================
// 7. CUSTOM CURSOR
// ============================================================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (cursor && follower && window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverTargets = document.querySelectorAll('a, button, .card, .skill-card, .logo-pill, .timeline__content');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hover');
      follower.classList.add('is-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hover');
      follower.classList.remove('is-hover');
    });
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '0.5';
  });
}

// ============================================================
// 8. ACTIVE NAV HIGHLIGHT
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.navbar__links a');

function highlightNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navAnchors.forEach(a => {
        a.style.opacity = '0.45';
        if (a.getAttribute('href') === `#${sectionId}`) {
          a.style.opacity = '1';
        }
      });
    }
  });
}
window.addEventListener('scroll', highlightNav);
highlightNav();

// ============================================================
// 9. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      // Use Lenis if available, otherwise fallback
      if (lenis) {
        lenis.scrollTo(target, { offset: -20 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (navLinks) navLinks.classList.remove('is-open');
    }
  });
});

// ============================================================
// 10. BACK TO TOP BUTTON
// ============================================================
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  });

  backToTop.addEventListener('click', () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

// ============================================================
// 11. 3D TILT EFFECT ON CARDS
// ============================================================
const tiltCards = document.querySelectorAll('.card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.transition = 'none';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease, box-shadow 0.25s ease';
  });
});

// ============================================================
// 12. MAGNETIC BUTTON EFFECT
// ============================================================
const magneticButtons = document.querySelectorAll('.btn, .btn-nav');
magneticButtons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ============================================================
// 13. TYPING EFFECT ON HERO LABEL
// ============================================================
const heroLabel = document.querySelector('.hero__label');
if (heroLabel) {
  const texts = [
    'Mahasiswa · Developer · Fotografer',
    'Web Developer · Designer · Creator',
    'D4 Teknik Informatika · UNAIR'
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'typing-cursor';
  heroLabel.appendChild(cursorSpan);

  function typeEffect() {
    const currentText = texts[textIndex];
    if (isDeleting) {
      heroLabel.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      heroLabel.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }
    heroLabel.appendChild(cursorSpan);

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 400;
    }
    setTimeout(typeEffect, typingSpeed);
  }

  // Start after GSAP hero animation
  setTimeout(typeEffect, 1800);
}

// ============================================================
// 14. SKILL CARD RIPPLE EFFECT
// ============================================================
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
  card.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.cssText = `
      position:absolute; width:${size}px; height:${size}px;
      left:${x}px; top:${y}px; background:rgba(200,169,110,0.2);
      border-radius:50%; transform:scale(0);
      animation:ripple 0.6s ease-out forwards; pointer-events:none;
    `;
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ============================================================
// 15. IMAGE LAZY FADE
// ============================================================
const images = document.querySelectorAll('.card__image img, .hero__photo-frame img');
images.forEach(img => {
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.8s ease';
  if (img.complete) {
    img.style.opacity = '1';
  } else {
    img.addEventListener('load', () => { img.style.opacity = '1'; });
  }
});

// ============================================================
// 16. COUNTER ANIMATION FOR STATS
// ============================================================
function animateCounter(el, target) {
  let current = 0;
  const increment = target / 40;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 30);
}

const statPills = document.querySelectorAll('.logo-pill');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const text = entry.target.textContent;
      const match = text.match(/(\d+)\+?/);
      if (match) {
        const num = parseInt(match[1]);
        const suffix = text.includes('+') ? '+' : '';
        const prefix = text.substring(0, text.indexOf(match[0]));
        const afterText = text.substring(text.indexOf(match[0]) + match[0].length);
        const span = document.createElement('span');
        span.className = 'counter-num';
        span.textContent = '0';
        const icon = entry.target.querySelector('i');
        entry.target.textContent = '';
        if (icon) entry.target.appendChild(icon);
        entry.target.appendChild(document.createTextNode(' ' + prefix));
        entry.target.appendChild(span);
        entry.target.appendChild(document.createTextNode(suffix + afterText));
        animateCounter(span, num);
      }
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statPills.forEach(pill => statsObserver.observe(pill));

// ============================================================
// INJECT RIPPLE KEYFRAMES
// ============================================================
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

// ============================================================
// 18. DARK MODE TOGGLE
// ============================================================
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
  // Check local storage or system preference
  const isDark = localStorage.getItem('theme') === 'dark' || 
                 (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    document.documentElement.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    if (document.documentElement.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      localStorage.setItem('theme', 'light');
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
}

// ============================================================
// LIGHTBOX for Design Showcase
// ============================================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxBackdrop = document.getElementById('lightbox-backdrop');

if (lightbox) {
  // Open lightbox on marquee item click
  document.querySelectorAll('.marquee__item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// ============================================================
// 19. SCROLL SECTION INDICATOR DOTS
// ============================================================
const scrollDots = document.getElementById('scroll-dots');
const dotLinks = document.querySelectorAll('.scroll-dots__dot');
const dotSections = [
  'hero', 'tentang', 'pengalaman', 'proyek', 'desain', 'skills', 'kontak'
];

if (scrollDots) {
  // Show/hide dots based on scroll position (hidden in hero top area)
  function toggleDotsVisibility() {
    if (window.scrollY > 300) {
      scrollDots.classList.add('is-visible');
    } else {
      scrollDots.classList.remove('is-visible');
    }
  }

  // Update active dot based on which section is in view
  function updateActiveDot() {
    let currentSection = dotSections[0];

    dotSections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        const offset = window.innerHeight * 0.4;
        if (rect.top <= offset && rect.bottom > offset) {
          currentSection = sectionId;
        }
      }
    });

    dotLinks.forEach(dot => {
      const dotSection = dot.getAttribute('data-section');
      if (dotSection === currentSection) {
        dot.classList.add('is-active');
      } else {
        dot.classList.remove('is-active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    toggleDotsVisibility();
    updateActiveDot();
  });

  // Initial check
  toggleDotsVisibility();
  updateActiveDot();

  // Smooth scroll on dot click
  dotLinks.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        if (typeof lenis !== 'undefined' && lenis) {
          lenis.scrollTo(target, { offset: -20 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// ============================================================
// 20. WHATSAPP FLOATING BUTTON — Entrance animation
// ============================================================
const waFloat = document.getElementById('wa-float');
if (waFloat) {
  // Hide initially, then animate in after a delay
  waFloat.style.opacity = '0';
  waFloat.style.transform = 'scale(0) translateY(20px)';

  setTimeout(() => {
    waFloat.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    waFloat.style.opacity = '1';
    waFloat.style.transform = 'scale(1) translateY(0)';

    // Reset inline styles after animation so CSS hover works
    setTimeout(() => {
      waFloat.style.transition = '';
      waFloat.style.opacity = '';
      waFloat.style.transform = '';
    }, 600);
  }, 2500);
}

// ============================================================
// END DOMContentLoaded
// ============================================================
});