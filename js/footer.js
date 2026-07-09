// Injeta o footer padrão em todas as páginas que possuem #footer-include
document.addEventListener('DOMContentLoaded', () => {
  const footerEl = document.getElementById('footer-include');
  if (!footerEl) return;

  footerEl.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo"><i class="fa-solid fa-paw"></i>Patinhas<span class="highlight">&Cia</span></a>
          <p>O portal completo para quem ama animais de estimação. Cuidados, alimentação, fotos e os melhores parceiros pet em um só lugar.</p>
          <div class="footer-social">
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
            <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Navegação</h4>
          <ul>
            <li><a href="index.html">Início</a></li>
            <li><a href="cuidados.html">Cuidados</a></li>
            <li><a href="alimentacao.html">Alimentação</a></li>
            <li><a href="galeria.html">Galeria de Fotos</a></li>
            <li><a href="blog.html">Blog</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Parceiros</h4>
          <ul>
            <li><a href="lojas.html">Lojas Pet</a></li>
            <li><a href="veterinarios.html">Veterinários</a></li>
            <li><a href="contato.html">Contato</a></li>
            <li><a href="contato.html">Seja Parceiro</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contato</h4>
          <ul class="footer-contact">
            <li><i class="fa-solid fa-location-dot"></i> Av. dos Pets, 123 — São Paulo, SP</li>
            <li><i class="fa-solid fa-phone"></i> (11) 4002-8922</li>
            <li><i class="fa-solid fa-envelope"></i> contato@patinhasecia.com.br</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Patinhas & Cia. Todos os direitos reservados.</span>
        <span>Feito com <i class="fa-solid fa-heart" style="color:#ff7a59;"></i> para todos os pets do mundo.</span>
      </div>
    </div>
  `;
});
