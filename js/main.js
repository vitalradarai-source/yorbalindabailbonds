// ── Mobile Nav ────────────────────────────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
}

// ── FAQ Accordion ─────────────────────────────────────────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-q').forEach(b => b.setAttribute('aria-expanded', 'false'));
    // Open clicked if it was closed
    if (!isOpen) {
      answer.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ── Contact Form Submission ───────────────────────────────────────────────────
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const successEl = document.getElementById('form-success');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    const data = {
      name:        form.name.value,
      phone:       form.phone.value,
      email:       form.email.value,
      inmate_name: form.inmate_name.value,
      message:     form.message.value,
      source:      'bailbonds-hermosabeach.com',
    };

    try {
      await fetch('https://n8n.srv1329589.hstgr.cloud/webhook/form-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      form.reset();
      if (successEl) successEl.classList.add('show');
    } catch {
      btn.textContent = 'Submit';
      btn.disabled = false;
      alert('Something went wrong. Please call us at (310) 341-2141.');
    }
  });
}

// ── Active Nav Link ───────────────────────────────────────────────────────────
const current = window.location.pathname.split('/').filter(Boolean).pop() || 'index';
document.querySelectorAll('nav a, .mobile-nav a').forEach(link => {
  const href = link.getAttribute('href') || '';
  if (href.includes(current) || (current === 'index' && (href === '/' || href === 'index.html'))) {
    link.classList.add('active');
  }
});
