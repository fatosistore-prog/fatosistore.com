// ============================================
// fatosistore.com — Main Script
// ============================================

// --- Mobile Navigation ---
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Close mobile nav when clicking a link
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
});

// --- Notification Banner ---
function showNotification(title, message) {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.className = 'notification';
  el.innerHTML = `<h4>${title}</h4><p>${message}</p>`;
  document.body.appendChild(el);

  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 400);
  }, 4000);
}

// --- Product Card Component ---
function createProductCard(product) {
  return `
    <a href="product.html?id=${product.id}" class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image"
           onerror="this.src='images/placeholder-plant.svg'">
      <div class="product-info">
        <div class="product-category">${product.categoryLabel}</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price">${formatPrice(product.price)}</div>
        <button class="btn btn-primary btn-sm" onclick="event.preventDefault(); addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    </a>
  `;
}

// --- Load Featured Products on Homepage ---
function loadFeaturedProducts(count = 4) {
  const grid = document.querySelector('.product-grid');
  if (!grid) return;

  const featured = products.slice(0, count);
  grid.innerHTML = featured.map(createProductCard).join('');
}

// --- Load All Products on Shop Page ---
function loadAllProducts(category = null) {
  const grid = document.querySelector('.product-grid');
  if (!grid) return;

  const filtered = getProductsByCategory(category);
  grid.innerHTML = filtered.map(createProductCard).join('');
}

// --- Render Filter Buttons ---
function renderFilters(activeCategory = null) {
  const container = document.querySelector('.filter-group');
  if (!container) return;

  const cats = getCategories();
  let html = `<button class="filter-btn ${!activeCategory ? 'active' : ''}" data-category="">All Products</button>`;
  cats.forEach(cat => {
    html += `<button class="filter-btn ${activeCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">${cat.label}</button>`;
  });
  container.innerHTML = html;

  // Filter click handlers
  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category || null;
      loadAllProducts(cat);
    });
  });
}

// --- Load Product Detail ---
function loadProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = getProductById(id);

  if (!product) {
    document.querySelector('.product-detail').innerHTML = '<div style="text-align:center;padding:60px"><h2>Product not found</h2><a href="shop.html" class="btn btn-primary" style="margin-top:20px">Back to Shop</a></div>';
    return;
  }

  document.title = `${product.name} — fatosistore.com`;

  document.querySelector('.product-detail-image').src = product.image;
  document.querySelector('.product-detail-image').onerror = function() {
    this.src = 'images/placeholder-plant.svg';
  };
  document.querySelector('.product-detail-info .product-category').textContent = product.categoryLabel;
  document.querySelector('.product-detail-info h1').textContent = product.name;
  document.querySelector('.product-detail-info .price').textContent = formatPrice(product.price);
  document.querySelector('.product-detail-info .description').textContent = product.description;

  // Details list
  const detailsList = document.querySelector('.product-detail-info .details-list');
  if (detailsList && product.details) {
    detailsList.innerHTML = product.details.map(d => `<li>${d}</li>`).join('');
  }

  // Add to cart button
  const addBtn = document.querySelector('.product-detail-info .btn-primary');
  if (addBtn) {
    addBtn.onclick = () => addToCart(product.id, parseInt(document.querySelector('.qty-value')?.textContent || 1));
  }

  // Quantity controls
  document.querySelector('.qty-btn:first-child')?.addEventListener('click', () => {
    const val = document.querySelector('.qty-value');
    let qty = parseInt(val.textContent);
    if (qty > 1) val.textContent = qty - 1;
  });
  document.querySelector('.qty-btn:last-child')?.addEventListener('click', () => {
    const val = document.querySelector('.qty-value');
    let qty = parseInt(val.textContent);
    if (qty < 99) val.textContent = qty + 1;
  });
}

// --- Load Checkout ---
function loadCheckout() {
  const cart = getCart();
  const container = document.querySelector('.order-summary');
  const totalEl = document.querySelector('.order-total');

  if (cart.length === 0) {
    document.querySelector('.checkout-section').innerHTML = '<div class="empty-cart"><div class="empty-cart-icon">🛒</div><h2>Your cart is empty</h2><p>Add some products before checking out.</p><a href="shop.html" class="btn btn-primary">Start Shopping</a></div>';
    return;
  }

  if (container) {
    container.innerHTML = `
      <h3>Order Summary</h3>
      ${cart.map(item => `
        <div class="order-item">
          <span>${item.name} × ${item.quantity}</span>
          <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
      `).join('')}
    `;
  }

  if (totalEl) {
    const subtotal = getCartTotal(cart);
    const shipping = subtotal >= 50 ? 0 : 5.00;
    totalEl.innerHTML = `
      <span>Total (with shipping)</span>
      <span>${formatPrice(subtotal + shipping)}</span>
    `;
  }

  // Form submission
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('customer-name').value.trim();
      const phone = document.getElementById('customer-phone').value.trim();
      const address = document.getElementById('customer-address').value.trim();
      const city = document.getElementById('customer-city').value.trim();
      const notes = document.getElementById('order-notes').value.trim();

      if (!name || !phone || !address || !city) {
        showToast('Please fill in all required fields');
        return;
      }

      // Build order object
      const order = {
        id: 'ORD-' + Date.now(),
        date: new Date().toLocaleString('en-AL', { timeZone: 'Europe/Tirane' }),
        customer: { name, phone, address, city, notes: notes || '-' },
        items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price, subtotal: i.price * i.quantity })),
        subtotal: getCartTotal(cart),
        shipping: getCartTotal(cart) >= 50 ? 0 : 5.00,
        total: getCartTotal(cart) + (getCartTotal(cart) >= 50 ? 0 : 5.00)
      };

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('fatosistore_orders') || '[]');
      orders.push(order);
      localStorage.setItem('fatosistore_orders', JSON.stringify(orders));

      // Send Telegram notification
      sendTelegramNotification(order);

      // Clear cart
      clearCart();

      // Show confirmation
      const params = new URLSearchParams({ name, orderId: order.id });
      window.location.href = `confirmation.html?${params.toString()}`;
    });
  }
}

// --- Load Admin Orders ---
function loadAdminOrders() {
  const container = document.querySelector('.admin-orders');
  const orders = JSON.parse(localStorage.getItem('fatosistore_orders') || '[]');

  if (orders.length === 0) {
    container.innerHTML = '<div class="admin-empty"><h2>No orders yet</h2><p>Orders will appear here when customers place them.</p></div>';
    return;
  }

  container.innerHTML = orders.reverse().map(order => `
    <div class="order-card">
      <div class="order-card-header">
        <span class="order-id">${order.id}</span>
        <span class="order-date">${order.date}</span>
      </div>
      <div class="order-customer">
        <p><strong>👤 ${order.customer.name}</strong></p>
        <p>📞 ${order.customer.phone}</p>
        <p>📍 ${order.customer.address}, ${order.customer.city}</p>
        ${order.customer.notes !== '-' ? `<p>📝 ${order.customer.notes}</p>` : ''}
      </div>
      <ul class="order-items-list">
        ${order.items.map(item => `
          <li>${item.name} × ${item.quantity} — ${formatPrice(item.subtotal)}</li>
        `).join('')}
      </ul>
      <div class="order-total-admin">
        Total: ${formatPrice(order.total)} ${order.shipping > 0 ? `(incl. ${formatPrice(order.shipping)} shipping)` : '(free shipping)'}
      </div>
    </div>
  `).join('');
}

// --- Telegram Notification ---
function sendTelegramNotification(order) {
  const token = '8824963479:AAFbY8y9eAXhRLEeLVlPS1gyB3zPdikGMcc';
  const chatId = '8526963580';

  const itemsList = order.items.map(i => `• ${i.name} × ${i.quantity} = ${formatPrice(i.subtotal)}`).join('\n');

  const message = `🛒 **NEW ORDER!** 🛒
━━━━━━━━━━━━━━━
👤 ${order.customer.name}
📞 ${order.customer.phone}
📍 ${order.customer.address}, ${order.customer.city}
${order.customer.notes !== '-' ? `📝 ${order.customer.notes}` : ''}
━━━━━━━━━━━━━━━
📦 Items:
${itemsList}
━━━━━━━━━━━━━━━
💰 **Total: ${formatPrice(order.total)}**
🆔 ${order.id}
📅 ${order.date}`;

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown'
    })
  }).catch(err => console.error('Telegram notify error:', err));
}

// --- Load Confirmation Page ---
function loadConfirmation() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') || 'Customer';
  const orderId = params.get('orderId') || '';

  const el = document.querySelector('.order-confirmation');
  if (el) {
    el.innerHTML = `
      <div class="checkmark">✅</div>
      <h1>Thank You, ${name}!</h1>
      <p>Your order <strong>${orderId}</strong> has been received. We will contact you at your phone number to confirm delivery details and arrange payment on delivery.</p>
      <p style="color: var(--text-light); margin-bottom: 30px;">For any questions, feel free to contact us.</p>
      <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
      <a href="index.html" class="btn btn-secondary" style="margin-left:12px;">Go Home</a>
    `;
  }
}