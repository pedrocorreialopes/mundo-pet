// =========================================================
// PATINHAS & CIA — Script Principal
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initRevealAnimations();
  initBackToTop();
  initTabs();
  initAccordion();
  initNewsletterForm();
  initContactForm();
  initReviewForm();
});

/* ---------- Header scroll effect ---------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
    }
  });
}

/* ---------- Mobile menu ---------- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ---------- Reveal on scroll ---------- */
function initRevealAnimations() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(item => observer.observe(item));
}

/* ---------- Back to top ---------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) btn.classList.add('show');
    else btn.classList.remove('show');
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- Tabs ---------- */
function initTabs() {
  const tabGroups = document.querySelectorAll('[data-tabs]');
  tabGroups.forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const groupId = group.getAttribute('data-tabs');
    const panels = document.querySelectorAll(`[data-tab-panel="${groupId}"]`);
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.getAttribute('data-tab-target');
        const panel = document.querySelector(`[data-tab-panel="${groupId}"][data-tab-id="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

/* ---------- Accordion (FAQ) ---------- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-body').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 40 + 'px';
      }
    });
  });
}

/* ---------- Newsletter Form ---------- */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.js-newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const msgEl = form.parentElement.querySelector('.form-message') || form.querySelector('.form-message');
      const email = emailInput.value.trim();
      if (!email) return;
      const submitBtn = form.querySelector('button');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
      try {
        await fetch('tables/newsletter_subscribers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name: '' })
        });
        showFormMessage(form, 'success', '🐾 Inscrição confirmada! Fique atento ao seu e-mail.');
        form.reset();
      } catch (err) {
        showFormMessage(form, 'error', 'Ops! Algo deu errado. Tente novamente.');
      } finally {
        submitBtn.innerHTML = originalText;
      }
    });
  });
}

function showFormMessage(form, type, text) {
  let msgEl = form.querySelector('.form-message');
  if (!msgEl) {
    msgEl = document.createElement('div');
    msgEl.className = 'form-message';
    form.appendChild(msgEl);
  }
  msgEl.className = `form-message ${type}`;
  msgEl.textContent = text;
  setTimeout(() => { msgEl.style.display = 'none'; }, 6000);
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim()
    };
    if (!data.name || !data.email || !data.message) return;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    try {
      await fetch('tables/contact_messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      showFormMessage(form, 'success', '🐶 Mensagem enviada com sucesso! Retornaremos em breve.');
      form.reset();
    } catch (err) {
      showFormMessage(form, 'error', 'Erro ao enviar. Tente novamente em instantes.');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

/* ---------- Review Form (Vets page) ---------- */
function initReviewForm() {
  const form = document.getElementById('review-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      clinic_name: form.clinic_name.value.trim(),
      reviewer_name: form.reviewer_name.value.trim(),
      rating: Number(form.rating.value),
      comment: form.comment.value.trim()
    };
    if (!data.clinic_name || !data.reviewer_name || !data.comment) return;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    try {
      await fetch('tables/vet_reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      showFormMessage(form, 'success', '⭐ Avaliação enviada, obrigado por compartilhar!');
      form.reset();
      if (typeof loadVetReviews === 'function') loadVetReviews();
    } catch (err) {
      showFormMessage(form, 'error', 'Erro ao enviar avaliação.');
    } finally {
      submitBtn.innerHTML = originalText;
    }
  });
}

/* ---------- Helper: format relative-ish numbers ---------- */
function formatNumber(n) {
  return new Intl.NumberFormat('pt-BR').format(n);
}
