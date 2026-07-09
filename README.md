# 🐾 Patinhas & Cia — Portal do Mundo Pet

Portal completo e visualmente atraente voltado para tutores de animais de estimação, reunindo cuidados, alimentação, galeria de fotos da comunidade, lojas de artigos pet e veterinários recomendados.

## 🎯 Objetivo do projeto

Ser o ponto de encontro de quem ama animais: informação confiável, comunidade acolhedora e os melhores parceiros (lojas e veterinários) para cuidar de cães, gatos e demais pets.

---

## ✅ Funcionalidades implementadas

### Páginas principais
| Página | Arquivo | Descrição |
|---|---|---|
| Início | `index.html` | Hero animado, marquee de parceiros, destaques de funcionalidades, preview do blog, preview da galeria, lojas/vets em destaque, depoimentos e newsletter. |
| Cuidados | `cuidados.html` | Conteúdo em abas (Saúde, Higiene, Filhotes, Pets Idosos, Comportamento) + FAQ em acordeão. |
| Alimentação | `alimentacao.html` | Guia por fase de vida, como ler rótulos de ração, tabela de alimentos seguros x proibidos, hidratação. |
| Galeria de Fotos | `galeria.html` | Galeria dinâmica (via Table API) com filtro por espécie, modal de detalhes e formulário de envio de fotos pela comunidade. |
| Lojas Pet | `lojas.html` | Grid de lojas parceiras com filtro por categoria (ração, acessórios, banho/tosa, online). |
| Veterinários | `veterinarios.html` | Grid de clínicas/veterinários recomendados + avaliações dinâmicas da comunidade (via Table API) + formulário para novas avaliações. |
| Blog | `blog.html` | Artigo em destaque + grid de artigos filtráveis por categoria (Alimentação, Cuidados, Comportamento, Curiosidades). |
| Contato | `contato.html` | Formulário de contato (via Table API), informações de contato, mapa incorporado e FAQ. |

### Recursos técnicos
- Design responsivo mobile-first com paleta calorosa (coral, turquesa, amarelo).
- Header fixo com menu mobile (hamburguer) e navegação sticky.
- Animações de entrada ao rolar a página (`reveal`), marquee infinito de parceiros, cards com hover 3D-like.
- Galeria de fotos dinâmica: dados armazenados na Table API (`pet_gallery`), com filtros client-side por espécie e modal de detalhes.
- Formulário de envio de fotos pela comunidade (grava na tabela `pet_gallery`).
- Sistema de avaliações de veterinários dinâmico (tabela `vet_reviews`) com formulário de nova avaliação.
- Formulário de contato gravando na tabela `contact_messages`.
- Formulário de newsletter gravando na tabela `newsletter_subscribers` (presente na home e no blog).
- Botão "voltar ao topo", acordeões de FAQ reutilizáveis, sistema de abas reutilizável.
- Todas as imagens usadas são de bancos de imagens livres (Creative Commons/Public Domain) obtidas via busca de imagens.

---

## 🔗 Estrutura de páginas (rotas)

Todas as rotas são arquivos estáticos na raiz do projeto:

- `/index.html`
- `/cuidados.html`
- `/alimentacao.html`
- `/galeria.html` (âncora `#upload` para o formulário de envio de fotos)
- `/lojas.html`
- `/veterinarios.html`
- `/blog.html`
- `/contato.html`

---

## 🗄️ Modelos de dados (Table API)

### `pet_gallery` — Galeria de fotos dos pets
| Campo | Tipo | Descrição |
|---|---|---|
| id | text | ID único |
| pet_name | text | Nome do pet |
| tutor_name | text | Nome do tutor(a) |
| species | text (enum) | Cachorro, Gato, Coelho, Ave, Roedor, Outro |
| image_url | text | URL da foto |
| description | text | Descrição/curiosidade |
| likes | number | Quantidade de curtidas |

### `vet_reviews` — Avaliações de veterinários/clínicas
| Campo | Tipo | Descrição |
|---|---|---|
| id | text | ID único |
| clinic_name | text | Nome da clínica/veterinário |
| reviewer_name | text | Nome de quem avalia |
| rating | number | Nota de 1 a 5 |
| comment | text | Comentário |

### `contact_messages` — Mensagens do formulário de contato
| Campo | Tipo | Descrição |
|---|---|---|
| id | text | ID único |
| name | text | Nome do remetente |
| email | text | E-mail |
| subject | text | Assunto |
| message | rich_text | Conteúdo da mensagem |

### `newsletter_subscribers` — Inscritos na newsletter
| Campo | Tipo | Descrição |
|---|---|---|
| id | text | ID único |
| email | text | E-mail |
| name | text | Nome (opcional) |

Todos os dados são acessados via **RESTful Table API** (`/tables/{nome_da_tabela}`), com operações de leitura (GET) e escrita (POST) feitas via `fetch()` no client-side.

---

## 🚧 Funcionalidades ainda não implementadas

- Sistema de curtidas persistente na galeria (atualmente `likes` é fixo, não incrementa via clique).
- Login/autenticação de usuários (não é possível em site estático sem backend de auth).
- Upload direto de arquivos de imagem (atualmente é necessário informar uma URL de imagem já hospedada).
- Páginas de artigo individuais no blog (atualmente os cards de blog levam para `#`, pois o conteúdo completo de cada artigo não foi desenvolvido).
- Busca/geolocalização real de lojas e veterinários por CEP (o mapa em Contato é estático/ilustrativo).
- Painel administrativo para moderar fotos e avaliações enviadas pela comunidade.

## 💡 Próximos passos recomendados

1. Criar páginas de artigo completas para cada matéria do blog.
2. Implementar sistema de curtidas com incremento real (PATCH na tabela `pet_gallery`).
3. Adicionar paginação/"carregar mais" na galeria quando o volume de fotos crescer.
4. Integrar um serviço de upload de imagem (ex.: input file + serviço externo de armazenamento) caso o usuário quera ir além de URLs.
5. Criar painel de moderação simples para aprovar fotos/avaliações antes de publicá-las.
6. Adicionar busca por localização (cidade/CEP) nas páginas de Lojas e Veterinários.

---

## 🎨 Stack utilizada

- **HTML5 semântico** + **CSS3** (variáveis customizadas, grid/flexbox, animações)
- **JavaScript vanilla** (sem frameworks) para interatividade, filtros, modais e integração com a Table API
- **Font Awesome 6** para ícones
- **Google Fonts** (Baloo 2 + Poppins) para tipografia
- **RESTful Table API** (Genspark) para persistência de dados (galeria, avaliações, mensagens, newsletter)

## 📁 Estrutura de arquivos

```
index.html
cuidados.html
alimentacao.html
galeria.html
lojas.html
veterinarios.html
blog.html
contato.html
css/
  └── style.css
js/
  ├── main.js              (interações globais: menu, tabs, forms, accordion, reveal)
  ├── footer.js             (injeta o footer padrão em todas as páginas)
  ├── gallery.js            (galeria: fetch, filtro, modal, upload)
  ├── gallery-preview.js     (preview da galeria na home)
  └── vet-reviews.js        (avaliações de veterinários)
README.md
```

---

## 🚀 Publicação

Para publicar o site e obter uma URL pública, utilize a aba **Publish** da plataforma — o processo de deploy é automático.
