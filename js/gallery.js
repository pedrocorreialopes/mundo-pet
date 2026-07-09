// =========================================================
// Galeria de Pets — carregamento, filtro, modal e upload
// =========================================================

let allPets = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  loadGallery();
  initFilters();
  initModal();
  initUploadForm();
});

async function loadGallery() {
  const container = document.getElementById('gallery-container');
  if (!container) return;
  try {
    const res = await fetch('tables/pet_gallery?limit=100');
    const json = await res.json();
    allPets = (json.data || []).sort((a, b) => (b.likes || 0) - (a.likes || 0));
    renderGallery();
  } catch (err) {
    container.innerHTML = '<p style="opacity:0.6;">Não foi possível carregar a galeria. Tente novamente mais tarde.</p>';
  }
}

function renderGallery() {
  const container = document.getElementById('gallery-container');
  if (!container) return;
  const filtered = currentFilter === 'all' ? allPets : allPets.filter(p => p.species === currentFilter);

  if (!filtered.length) {
    container.innerHTML = '<p style="opacity:0.6; grid-column: 1/-1; text-align:center;">Nenhum pet encontrado nessa categoria ainda. Seja o primeiro a compartilhar! 🐾</p>';
    return;
  }

  container.innerHTML = filtered.map((pet, idx) => `
    <div class="gallery-item reveal visible" data-idx="${idx}" data-id="${pet.id}">
      <span class="gallery-species-tag">${speciesEmoji(pet.species)} ${pet.species || ''}</span>
      <img src="${pet.image_url}" alt="${pet.pet_name}" loading="lazy">
      <div class="gallery-overlay">
        <h4>${pet.pet_name}</h4>
        <p>Tutor(a): ${pet.tutor_name || '—'}</p>
        <div class="gallery-likes"><i class="fa-solid fa-heart"></i> ${pet.likes || 0}</div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id');
      const pet = filtered.find(p => p.id === id);
      if (pet) openModal(pet);
    });
  });
}

function speciesEmoji(species) {
  const map = {
    'Cachorro': '🐶',
    'Gato': '🐱',
    'Coelho': '🐰',
    'Ave': '🦜',
    'Roedor': '🐹',
    'Outro': '🐾'
  };
  return map[species] || '🐾';
}

function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderGallery();
    });
  });
}

function initModal() {
  const modal = document.getElementById('pet-modal');
  const closeBtn = document.getElementById('modal-close');
  if (!modal) return;
  closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
}

function openModal(pet) {
  const modal = document.getElementById('pet-modal');
  if (!modal) return;
  document.getElementById('modal-img').src = pet.image_url;
  document.getElementById('modal-img').alt = pet.pet_name;
  document.getElementById('modal-species').textContent = `${speciesEmoji(pet.species)} ${pet.species}`;
  document.getElementById('modal-name').textContent = pet.pet_name;
  document.getElementById('modal-tutor').textContent = `Tutor(a): ${pet.tutor_name || '—'}`;
  document.getElementById('modal-desc').textContent = pet.description || 'Sem descrição por enquanto, mas com certeza é um pet muito amado!';
  document.getElementById('modal-likes').textContent = pet.likes || 0;
  modal.classList.add('open');
}

function initUploadForm() {
  const form = document.getElementById('upload-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      pet_name: form.pet_name.value.trim(),
      tutor_name: form.tutor_name.value.trim(),
      species: form.species.value,
      image_url: form.image_url.value.trim(),
      description: form.description.value.trim(),
      likes: 0
    };
    if (!data.pet_name || !data.tutor_name || !data.species || !data.image_url) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    try {
      await fetch('tables/pet_gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const msgEl = form.querySelector('.form-message');
      msgEl.className = 'form-message success';
      msgEl.textContent = '🐾 Foto enviada com sucesso! Ela já está na galeria.';
      form.reset();
      loadGallery();
    } catch (err) {
      const msgEl = form.querySelector('.form-message');
      msgEl.className = 'form-message error';
      msgEl.textContent = 'Erro ao enviar. Verifique o link da imagem e tente novamente.';
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}
