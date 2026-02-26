/* ═══════════════════════════════════════════════
   SILVIA WAIMANN — ASISTENTE VIRTUAL
   script.js
   ═══════════════════════════════════════════════ */

// ── NAVBAR: SCROLL EFFECT ──────────────────────
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
});

// ── MOBILE NAV ────────────────────────────────
function toggleMobile() {
  var nav = document.getElementById('mobileNav');
  var hamburger = document.getElementById('hamburger');
  if (nav) nav.classList.toggle('open');
  if (hamburger) hamburger.classList.toggle('hidden');
  document.body.style.overflow = nav && nav.classList.contains('open') ? 'hidden' : '';
}

// Close mobile nav on outside click
document.addEventListener('click', function (e) {
  const nav = document.getElementById('mobileNav');
  const hamburger = document.getElementById('hamburger');
  if (
    nav &&
    nav.classList.contains('open') &&
    !nav.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    toggleMobile();
  }
});

// ── SCROLL REVEAL ─────────────────────────────
(function initScrollReveal() {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

// ── COUNTER ANIMATION ─────────────────────────
function animateCounter(el, target, suffix) {
  var start = 0;
  var duration = 1600;
  var startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = Math.min((timestamp - startTime) / duration, 1);
    // Ease out
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.floor(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(step);
}

(function initCounters() {
  var statsSection = document.getElementById('stats');
  if (!statsSection) return;

  var hasAnimated = false;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          var nums = entry.target.querySelectorAll('.stat-block-num');
          nums.forEach(function (num) {
            var text = num.textContent.trim();
            if (text.includes('+')) {
              animateCounter(num, parseInt(text), '+');
            } else if (text.includes('%')) {
              animateCounter(num, parseInt(text), '%');
            } else {
              animateCounter(num, parseInt(text), '');
            }
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statsSection);
})();

// ── FORM VALIDATION & SUBMIT ──────────────────
function submitForm() {
  var nombre   = document.getElementById('nombre');
  var email    = document.getElementById('email');
  var servicio = document.getElementById('servicio');

  var hasError = false;

  // Reset previous error states
  [nombre, email, servicio].forEach(function (el) {
    el.style.borderColor = '';
    el.style.boxShadow  = '';
  });

  // Validate required fields
  if (!nombre || !nombre.value.trim()) {
    markError(nombre);
    hasError = true;
  }

  if (!email || !isValidEmail(email.value.trim())) {
    markError(email);
    hasError = true;
  }

  if (!servicio || !servicio.value) {
    markError(servicio);
    hasError = true;
  }

  if (hasError) {
    // Scroll to first error
    var firstError = document.querySelector('input[style], select[style]');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
    return;
  }

  // Show success
  var form       = document.getElementById('contactForm');
  var successMsg = document.getElementById('successMsg');

  if (form) form.style.display = 'none';
  if (successMsg) successMsg.classList.add('show');

  // Scroll to success message
  var contactSection = document.getElementById('contacto');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function markError(el) {
  if (!el) return;
  el.style.borderColor = '#ef4444';
  el.style.boxShadow   = '0 0 0 3px rgba(239, 68, 68, 0.12)';

  // Listen for user input to clear error
  el.addEventListener('input', function clearError() {
    el.style.borderColor = '';
    el.style.boxShadow   = '';
    el.removeEventListener('input', clearError);
  }, { once: true });
}

function isValidEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

// ── SMOOTH SCROLL ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = this.getAttribute('href');
    if (target === '#') return;
    var el = document.querySelector(target);
    if (el) {
      e.preventDefault();
      var navbarHeight = document.getElementById('navbar').offsetHeight || 80;
      var top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});

// ── ACTIVE NAV LINK ON SCROLL ─────────────────
(function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;
    var navbarHeight = document.getElementById('navbar').offsetHeight || 80;

    sections.forEach(function (section) {
      var sectionTop    = section.offsetTop - navbarHeight - 10;
      var sectionBottom = sectionTop + section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  });
})();

function copiarEmail(e) {
  e.preventDefault();
  var email = 'silvia@silviawaiman.com';
  navigator.clipboard.writeText(email).then(function () {
    var link = e.target;
    var textoOriginal = link.textContent;
    link.textContent = '¡Email copiado!';
    link.style.color = '#00d0fc';
    setTimeout(function () {
      link.textContent = textoOriginal;
      link.style.color = '';
    }, 2500);
  });
}