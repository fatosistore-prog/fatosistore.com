// ============================================
// fatosistore.com — Main Application JS
// ============================================

// ===== DEFAULT PRODUCTS =====
const DEFAULT_PRODUCTS = [
  {
    id: 1, name: "Bimë Artificiale Bambu", category: "artificial-plants",
    categoryLabel: "Bimë Artificiale", price: 4500, oldPrice: 5500,
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop",
    description: "Bimë artificiale bambuje e bukur që i shton freski çdo dhomeje. Nuk ka nevojë për ujitje — qëndron jeshile gjatë gjithë vitit.",
    shipping: 0, badge: "hot", stock: 10
  },
  {
    id: 2, name: "Bimë Monstera Artificiale", category: "artificial-plants",
    categoryLabel: "Bimë Artificiale", price: 3800, oldPrice: 0,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=300&fit=crop",
    description: "Bimë Monstera artificiale me gjethe të mëdha të ndara. Sjell atmosferë tropikale në shtëpinë tuaj.",
    shipping: 0, badge: "new", stock: 8
  },
  {
    id: 3, name: "Lavender Artificiale", category: "artificial-plants",
    categoryLabel: "Bimë Artificiale", price: 2800, oldPrice: 3500,
    image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=400&h=300&fit=crop",
    description: "Tufë e bukur lulesh lavande artificiale. E përsosur për të shtuar ngjyrë dhe aromë rustike në kuzhinë ose dhomë gjumi.",
    shipping: 0, badge: "sale", stock: 15
  },
  {
    id: 4, name: "Makinë Elektrike Audi R8 për Fëmijë", category: "toys-remote",
    categoryLabel: "Makina me Pult", price: 8900, oldPrice: 11000,
    image: "https://images.unsplash.com/photo-1581235707960-23b7e8b9b8c9?w=400&h=300&fit=crop",
    description: "Makinë elektrike me telekomandë Audi R8 për fëmijë 2-5 vjeç. Dizajn realist, e lehtë për t'u përdorur dhe e sigurt për brenda shtëpisë.",
    shipping: 500, badge: "hot", stock: 5
  },
  {
    id: 5, name: "Jeep 12V për Fëmijë me Pult", category: "toys-remote",
    categoryLabel: "Makina me Pult", price: 18900, oldPrice: 22000,
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop",
    description: "Jeep i fuqishëm 12V për fëmijë aventurierë 3-8 vjeç. Me telekomandë prindërore, lojëtar MP3 dhe dritat funksionale.",
    shipping: 1000, badge: "hot", stock: 3
  },
  {
    id: 6, name: "Kamion Monster me Pult", category: "toys-remote",
    categoryLabel: "Makina me Pult", price: 3500, oldPrice: 0,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
    description: "Kamion monster me shpejtësi të lartë me rrota gjigante. I përsosur për aventura jashtë rrugës. Ndërtim i qëndrueshëm.",
    shipping: 500, badge: "", stock: 12
  },
  {
    id: 7, name: "Set Blloqe Ndërtimi (200 copë)", category: "toys",
    categoryLabel: "Lojëra", price: 2400, oldPrice: 3000,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=400&h=300&fit=crop",
    description: "Set me 200 blloqe me ngjyra që ndihmojnë në zhvillimin e kreativitetit dhe aftësive motorrike. Përputhen me markat kryesore.",
    shipping: 0, badge: "sale", stock: 20
  },
  {
    id: 8, name: "Arush i Madh Plush (80cm)", category: "toys",
    categoryLabel: "Lojëra", price: 3200, oldPrice: 0,
    image: "https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=400&h=300&fit=crop",
    description: "Arush i butë dhe i rehatshëm 80cm i lartë. Material cilësor plush. Dhuratë e përsosur për çdo fëmijë.",
    shipping: 500, badge: "new", stock: 7
  },
  {
    id: 9, name: "Puzzle Montessori prej Druri", category: "toys",
    categoryLabel: "Lojëra", price: 1800, oldPrice: 0,
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop",
    description: "Puzzle edukativ prej druri me parime Montessori. Ndihmon në zhvillimin e aftësive motorike dhe njohjen e formave.",
    shipping: 0, badge: "", stock: 25
  },
  {
    id: 10, name: "Set Vazo Qeramike (3 copë)", category: "home-decor",
    categoryLabel: "Dekor Shtëpie", price: 4200, oldPrice: 5000,
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=400&h=300&fit=crop",
    description: "Set elegant me 3 vazo qeramike në madhësi të ndryshme. Dizajn minimalist që plotëson çdo stil interieri.",
    shipping: 500, badge: "", stock: 6
  },
  {
    id: 11, name: "Set Qirinj me Aromë (4 copë)", category: "home-decor",
    categoryLabel: "Dekor Shtëpie", price: 2600, oldPrice: 0,
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=300&fit=crop",
    description: "Qirinj prej dylli soje me 4 aroma: Vanilje, Lavender, Agrume dhe Linë e Freskët. Djegin pastër deri në 40 orë secili.",
    shipping: 0, badge: "new", stock: 18
  },
  {
    id: 12, name: "Varje Muri Macramé", category: "home-decor",
    categoryLabel: "Dekor Shtëpie", price: 3400, oldPrice: 4200,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop",
    description: "Varje muri e bërë me dorë në stil boho-chic. Shton teksturë dhe ngrohtësi në çdo mur. Çdo copë është unike.",
    shipping: 0, badge: "sale", stock: 4
  }
];

// ===== STORAGE HELPERS =====
function getProducts() {
  const stored = localStorage.getItem('fatosi_products');
  if (stored) return JSON.parse(stored);
  // Initialize with defaults
  localStorage.setItem('fatosi_products', JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
}

function saveProducts(products) {
  localStorage.setItem('fatosi_products', JSON.stringify(products));
}

function getCart() {
  return JSON.parse(localStorage.getItem('fatosi_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('fatosi_cart', JSON.stringify(cart));
  updateCartCount();
}

function getOrders() {
  return JSON.parse(localStorage.getItem('fatosi_orders') || '[]');
}

function saveOrder(order) {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem('fatosi_orders', JSON.stringify(orders));
}

// ===== CATEGORY HELPERS =====
const CATEGORY_LABELS = {
  'artificial-plants': 'Bimë Artificiale',
  'toys-remote': 'Makina me Pult',
  'toys': 'Lojëra',
  'home-decor': 'Dekor Shtëpie'
};

let currentCategory = '';
let currentSearch = '';
let modalProduct = null;
let modalQty = 1;

// ===== RENDER PRODUCTS =====
function renderProducts() {
  const products = getProducts();
  const grid = document.getElementById('productGrid');
  const noProducts = document.getElementById('noProducts');
  const countEl = document.getElementById('productCount');

  let filtered = products;

  if (currentCategory) {
    filtered = filtered.filter(p => p.category === currentCategory);
  }
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.categoryLabel || '').toLowerCase().includes(q)
    );
  }

  countEl.textContent = `(${filtered.length} produkte)`;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noProducts.style.display = 'block';
    return;
  }

  noProducts.style.display = 'none';
  grid.innerHTML = filtered.map(p => `
    <div class="product-card" onclick="openModal(${p.id})">
      ${p.badge ? `<span class="badge ${p.badge}">${p.badge === 'hot' ? 'HOT' : p.badge === 'new' ? 'E RE' : 'ULJE'}</span>` : ''}
      <button class="wishlist-btn" onclick="event.stopPropagation(); toggleWishlist(${p.id})">♡</button>
      <div class="img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22><rect fill=%22%23f5f5f5%22 width=%22400%22 height=%22300%22/><text x=%22200%22 y=%22150%22 text-anchor=%22middle%22 fill=%22%23ccc%22 font-size=%2240%22>🛒</text></svg>'">
      </div>
      <div class="card-body">
        <div class="category-tag">${CATEGORY_LABELS[p.category] || p.category}</div>
        <h3>${p.name}</h3>
        <div class="price-row">
          <span class="price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
        <div class="shipping ${p.shipping > 0 ? 'paid' : ''}">
          ${p.shipping > 0 ? `📦 Posta: ${formatPrice(p.shipping)}` : '📦 Posta Falas'}
        </div>
        <button class="btn-add" onclick="event.stopPropagation(); quickAdd(${p.id})">🛒 Shto në Shportë</button>
      </div>
    </div>
  `).join('');
}

function formatPrice(cents) {
  // Prices stored in cents (lek * 100) or as integers
  if (cents >= 1000) return (cents / 100).toFixed(0) + ' L';
  return cents + ' L';
}

// ===== HERO PRODUCTS =====
function renderHeroProducts() {
  const products = getProducts();
  const hot = products.filter(p => p.badge === 'hot').slice(0, 4);
  const el = document.getElementById('heroProducts');
  if (hot.length === 0) {
    el.style.display = 'none';
    return;
  }
  el.innerHTML = hot.map(p => `
    <a class="hero-product-card" href="#" onclick="openModal(${p.id}); return false;">
      <img src="${p.image}" alt="${p.name}" onerror="this.style.background='#eee'">
      <div class="info">
        <h4>${p.name}</h4>
        <div class="price">${formatPrice(p.price)}</div>
      </div>
    </a>
  `).join('');
}

// ===== CATEGORY COUNTS =====
function updateCategoryCounts() {
  const products = getProducts();
  const counts = { 'artificial-plants': 0, 'toys-remote': 0, 'toys': 0, 'home-decor': 0 };
  products.forEach(p => { if (counts[p.category] !== undefined) counts[p.category]++; });
  const el = (id) => document.getElementById(id);
  if (el('count-plants')) el('count-plants').textContent = counts['artificial-plants'] + ' produkte';
  if (el('count-remote')) el('count-remote').textContent = counts['toys-remote'] + ' produkte';
  if (el('count-toys')) el('count-toys').textContent = counts['toys'] + ' produkte';
  if (el('count-decor')) el('count-decor').textContent = counts['home-decor'] + ' produkte';
}

// ===== FILTER & SEARCH =====
function setCategory(el, cat) {
  currentCategory = cat;
  // Update active nav
  document.querySelectorAll('.cat-nav a').forEach(a => a.classList.remove('active'));
  if (el) el.classList.add('active');
  else {
    document.querySelector(`.cat-nav a[data-cat="${cat}"]`)?.classList.add('active');
  }
  renderProducts();
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}

function filterProducts() {
  currentSearch = document.getElementById('searchInput').value;
  renderProducts();
}

// ===== MODAL =====
function openModal(id) {
  const product = getProducts().find(p => p.id === id);
  if (!product) return;
  modalProduct = product;
  modalQty = 1;

  document.getElementById('modalImg').src = product.image;
  document.getElementById('modalCategory').textContent = CATEGORY_LABELS[product.category] || product.category;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalPrice').textContent = formatPrice(product.price) +
    (product.oldPrice ? ` <span style="font-size:16px;color:var(--text-muted);text-decoration:line-through;">${formatPrice(product.oldPrice)}</span>` : '');
  document.getElementById('modalShipping').textContent = product.shipping > 0 ?
    `📦 Posta: ${formatPrice(product.shipping)}` : '📦 Posta Falas';
  document.getElementById('modalDesc').textContent = product.description || '';
  document.getElementById('modalQty').textContent = '1';

  document.getElementById('productModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('productModal').classList.remove('active');
  document.body.style.overflow = '';
}

function changeQty(delta) {
  modalQty = Math.max(1, Math.min(99, modalQty + delta));
  document.getElementById('modalQty').textContent = modalQty;
}

function addToCartFromModal() {
  if (!modalProduct) return;
  addToCart(modalProduct.id, modalQty);
  closeModal();
}

// ===== CART =====
function addToCart(id, qty = 1) {
  const product = getProducts().find(p => p.id === id);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      shipping: product.shipping || 0,
      image: product.image,
      quantity: qty
    });
  }
  saveCart(cart);
  showToast(`${product.name} u shtua në shportë!`);
}

function quickAdd(id) {
  addToCart(id, 1);
}

function removeFromCart(id) {
  let cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
}

function getCartTotal() {
  const cart = getCart();
  let subtotal = 0;
  let shipping = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    shipping += item.shipping * item.quantity;
  });
  return { subtotal, shipping, total: subtotal + shipping };
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = count;
}

function openCart() {
  renderCart();
  document.getElementById('cartDrawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.body.style.overflow = '';
}

function renderCart() {
  const cart = getCart();
  const el = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');

  if (cart.length === 0) {
    el.innerHTML = '<div class="cart-empty"><div class="icon">🛒</div><p>Shporta juaj është bosh</p></div>';
    totalEl.textContent = '0 L';
    return;
  }

  el.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" onerror="this.style.background='#eee'">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="price">${item.quantity}x ${formatPrice(item.price)}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join('');

  const totals = getCartTotal();
  totalEl.textContent = formatPrice(totals.total);
  updateCartCount();
}

// ===== CHECKOUT =====
function goToCheckout() {
  closeCart();
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Shporta juaj është bosh!');
    return;
  }
  window.location.href = 'checkout.html';
}

// ===== WISHLIST (simple) =====
function toggleWishlist(id) {
  showToast('U shtua në të preferuara!');
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderHeroProducts();
  updateCategoryCounts();
  updateCartCount();
});
