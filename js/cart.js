// ============================================
// fatosistore.com — Shopping Cart
// ============================================

const CART_KEY = 'fatosistore_cart';

// --- Cart Operations ---

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product) return false;

  let cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity, name: product.name, price: product.price, image: product.image });
  }

  saveCart(cart);
  showToast(`${product.name} added to cart!`);
  return true;
}

function removeFromCart(productId) {
  let cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  updateCartUI();
}

function updateQuantity(productId, quantity) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  item.quantity = quantity;
  saveCart(cart);
  updateCartUI();
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

function getCartTotal(cart) {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

// --- UI Updates ---

function updateCartCount() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function updateCartUI() {
  const cart = getCart();
  updateCartCount();

  // Update mini cart / summary if present
  const itemsContainer = document.querySelector('.cart-items');
  const summaryContainer = document.querySelector('.cart-summary-wrapper');

  if (itemsContainer) renderCartItems(cart, itemsContainer);
  if (summaryContainer) renderCartSummary(cart, summaryContainer);

  // Show empty state
  const emptyState = document.querySelector('.empty-cart');
  if (emptyState) {
    emptyState.style.display = cart.length === 0 ? 'block' : 'none';
  }
  if (itemsContainer) {
    itemsContainer.style.display = cart.length === 0 ? 'none' : 'block';
  }
}

function renderCartItems(cart, container) {
  if (cart.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = cart.map(item => {
    const product = getProductById(item.id);
    const subtotal = item.price * item.quantity;
    return `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image"
             onerror="this.src='images/placeholder-plant.svg'">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>${formatPrice(item.price)} each</p>
        </div>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
          <strong>${formatPrice(subtotal)}</strong>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderCartSummary(cart, container) {
  const subtotal = getCartTotal(cart);
  const shipping = subtotal >= 50 ? 0 : 5.00;
  const total = subtotal + shipping;

  container.innerHTML = `
    <div class="cart-summary">
      <h3>Order Summary</h3>
      <div class="summary-row">
        <span>Subtotal (${cart.length} items)</span>
        <span>${formatPrice(subtotal)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping</span>
        <span>${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
      </div>
      ${subtotal < 50 ? '<div class="summary-row" style="font-size:13px;color:var(--text-light)">Free shipping on orders over 50 €</div>' : ''}
      <div class="summary-row total">
        <span>Total</span>
        <span>${formatPrice(total)}</span>
      </div>
      <a href="checkout.html" class="btn btn-primary">Proceed to Checkout</a>
      <a href="shop.html" class="btn btn-secondary" style="margin-top:8px;">Continue Shopping</a>
    </div>
  `;
}

// --- Toast ---

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});