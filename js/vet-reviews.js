// Carrega e exibe as avaliações de veterinários/clínicas
async function loadVetReviews() {
  const container = document.getElementById('reviews-grid');
  if (!container) return;
  try {
    const res = await fetch('tables/vet_reviews?limit=50');
    const json = await res.json();
    const reviews = (json.data || []).sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
    if (!reviews.length) {
      container.innerHTML = '<p style="opacity:0.6;">Ainda não há avaliações. Seja o primeiro a avaliar!</p>';
      return;
    }
    container.innerHTML = reviews.map(r => `
      <div class="testimonial-card reveal visible">
        <div class="testimonial-stars">${renderStars(r.rating)}</div>
        <p class="text">"${escapeHtml(r.comment)}"</p>
        <div class="testimonial-author">
          <div style="width:46px;height:46px;border-radius:50%;background:var(--color-primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;">${(r.reviewer_name || '?').charAt(0).toUpperCase()}</div>
          <div><strong>${escapeHtml(r.reviewer_name)}</strong><span>${escapeHtml(r.clinic_name)}</span></div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = '<p style="opacity:0.6;">Não foi possível carregar as avaliações agora.</p>';
  }
}

function renderStars(rating) {
  const full = Math.round(Number(rating) || 0);
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<i class="fa-solid fa-star" style="${i > full ? 'opacity:0.25;' : ''}"></i>`;
  }
  return html;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

document.addEventListener('DOMContentLoaded', loadVetReviews);
