// ============================================
// SK THUNDER - Glavni JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- NAVIGACIJA: scroll efekt ----
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ---- HAMBURGER MENU ----
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Zatvori menu pri klik na link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---- ACTIVE NAV LINK ----
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveLink() {
    let scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // ---- REVEAL ON SCROLL ----
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => revealObserver.observe(el));

  // ---- KARUSEL ----
  const carousels = document.querySelectorAll('.carousel-wrapper');

  carousels.forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const slides = wrapper.querySelectorAll('.carousel-slide');
    const prevBtn = wrapper.querySelector('.carousel-btn.prev');
    const nextBtn = wrapper.querySelector('.carousel-btn.next');
    const dotsContainer = wrapper.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    let current = 0;
    const total = slides.length;

    // Stvori točke
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    }

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      // Ažuriraj točke
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === current);
        });
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto-play
    setInterval(() => goTo(current + 1), 5000);
  });

  // ---- VIDEO PLAYER ----
  const videoWrapper = document.querySelector('.video-wrapper');
  if (videoWrapper) {
    const placeholder = videoWrapper.querySelector('.video-placeholder');
    const videoFrame = videoWrapper.querySelector('.video-frame');

    if (placeholder && videoFrame) {
      placeholder.addEventListener('click', function () {
        // Zamijeni placeholder s video elementom
        placeholder.style.display = 'none';
        videoFrame.style.display = 'block';
        videoFrame.play && videoFrame.play();
      });
    }
  }

  // ---- KONTAKT FORMA ----
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = '✓ Poruka poslana!';
      btn.style.background = '#22c55e';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  // ---- COUNTER ANIMATION ----
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current) + (el.dataset.suffix || '');
        }, 16);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ---- SMOOTH SCROLL za href="#" linkove ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- ZVUK TOGGLE ----
  const soundBtn = document.getElementById('sound-btn');
  const bgAudio = document.getElementById('bg-audio');

  if (soundBtn && bgAudio) {
    soundBtn.addEventListener('click', function () {
      if (bgAudio.paused) {
        bgAudio.play();
        soundBtn.textContent = '🔊';
        soundBtn.title = 'Isključi zvuk';
      } else {
        bgAudio.pause();
        soundBtn.textContent = '🔇';
        soundBtn.title = 'Uključi zvuk';
      }
    });
  }

});
