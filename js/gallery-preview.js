// Carrega uma pré-visualização da galeria de pets na home
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('home-gallery-preview');
  if (!container) return;

  try {
    const res = await fetch('tables/pet_gallery?limit=8');
    const json = await res.json();
    const pets = (json.data || []).slice(0, 4);
    if (!pets.length) {
      container.innerHTML = '<p style="opacity:0.6;">Nenhuma foto disponível ainda. Seja o primeiro a compartilhar!</p>';
      return;
    }
    container.innerHTML = pets.map(pet => `
      <div class="gallery-item">
        <span class="gallery-species-tag">${pet.species || ''}</span>
        <img src="${pet.image_url}" alt="${pet.pet_name}" loading="lazy">
        <div class="gallery-overlay">
          <h4>${pet.pet_name}</h4>
          <p>Tutor(a): ${pet.tutor_name || '—'}</p>
          <div class="gallery-likes"><i class="fa-solid fa-heart"></i> ${pet.likes || 0}</div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = '<p style="opacity:0.6;">Não foi possível carregar a galeria agora.</p>';
  }
});
