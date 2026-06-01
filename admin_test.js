
    // ===== CONFIG =====
    const ADMIN_PASS_B64 = 'S3JlbWJhbmFuamE=';
    const SESSION_KEY = 'fatosistore_admin_unlocked';
    const PRODUCTS_KEY = 'fatosi_products';
    const ORDERS_KEY = 'fatosi_orders';

    const CATEGORY_LABELS = {
      'bime-artificiale': '🌿 Bimë Artificiale',
      'lodra-femije': '🧸 Lodra për Fëmijë',
      'fitnesi': '💪 Fitnesi',
      'dekor-shtepie': '🏠 Dekor Shtëpie',
      'per-femra': '👩 Për Femra',
      'ditelindja': '🎂 Ditëlindja',
      'aksion': '🔥 Aksion'
    };

    // ===== AUTH =====
    function checkPassword() {
      const input = document.getElementById('passwordInput');
      const error = document.getElementById('loginError');
      if (btoa(input.value) === ADMIN_PASS_B64) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        unlockAdmin();
      } else {
        error.classList.add('show');
        input.value = '';
        input.focus();
        setTimeout(() => error.classList.remove('show'), 3000);
      }
    }
    function unlockAdmin() {
      document.getElementById('loginOverlay').style.display = 'none';
      document.getElementById('adminContent').classList.add('unlocked');
      loadProducts();
      loadOrders();
    }
    function lockAdmin() {
      sessionStorage.removeItem(SESSION_KEY);
      document.getElementById('adminContent').classList.remove('unlocked');
      document.getElementById('loginOverlay').style.display = 'flex';
      document.getElementById('passwordInput').value = '';
      document.getElementById('passwordInput').focus();
    }
    document.addEventListener('DOMContentLoaded', () => {
      if (sessionStorage.getItem(SESSION_KEY) === 'true') unlockAdmin();
      document.getElementById('passwordInput').addEventListener('keydown', e => { if (e.key === 'Enter') checkPassword(); });
      document.getElementById('passwordInput').focus();
      // Attach save button handler
      var saveBtn = document.getElementById('saveProductBtn');
      if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          saveProduct(e);
        });
      }
    });

    // ===== TABS =====
    function switchTab(tab) {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.querySelector(`.admin-tab[onclick="switchTab('${tab}')"]`).classList.add('active');
      document.getElementById('tab-' + tab).classList.add('active');
    }

    // ===== PRODUCTS =====
    function getProducts() { 
      let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
      // If localStorage is empty, try sessionStorage backup
      if (products.length === 0) {
        const backup = sessionStorage.getItem(PRODUCTS_KEY + '_backup');
        if (backup) {
          products = JSON.parse(backup);
          localStorage.setItem(PRODUCTS_KEY, backup);
        }
      }
      return products;
    }
    function saveProducts(products) { 
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products)); 
      sessionStorage.setItem(PRODUCTS_KEY + '_backup', JSON.stringify(products));
    }
    
    function exportOrders() {
      const orders = getOrders();
      if (orders.length === 0) { alert('Nuk ka porosi per te shkarkuar'); return; }
      const lines = ['ID,Data,Emri,Mbiemri,Telefoni,Adresa,Produktet,Sasia,Posta,Totali,Statusi'];
      orders.forEach(o => {
        const date = new Date(o.date).toLocaleDateString('sq-AL');
        const items = o.items.map(i => i.name + ' x' + i.quantity).join('; ');
        const qty = o.items.reduce((s, i) => s + i.quantity, 0);
        const addr = (o.customer.address || '').replace(/"/g, '""');
        lines.push([o.id, date, o.customer.firstName, o.customer.lastName, o.customer.phone, addr, items, qty, o.shipping.toFixed(2), o.total.toFixed(2), (o.status || 'new')].map(v => '"' + v + '"').join(','));
      });
      const blob = new Blob(['\ufeff' + lines.join('\n')], {type: 'text/csv;charset=utf-8;'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'fatosi_porosite_' + new Date().toISOString().slice(0,10) + '.csv';
      a.click();
      URL.revokeObjectURL(url);
    }
    
    function importOrders() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
          try {
            const orders = JSON.parse(ev.target.result);
            if (Array.isArray(orders)) {
              localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
              sessionStorage.setItem(ORDERS_KEY + '_backup', JSON.stringify(orders));
              loadOrders();
              alert('Porosite u importuan! (' + orders.length + ' porosi)');
            }
          } catch(err) {
            alert('Gabim ne skedar');
          }
        };
        reader.readAsText(file);
      };
      input.click();
    }

    function exportProducts() {
      const products = getProducts();
      const data = JSON.stringify(products, null, 2);
      const blob = new Blob([data], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'fatosi_produktet_' + new Date().toISOString().slice(0,10) + '.json';
      a.click();
      URL.revokeObjectURL(url);
    }
    
    function importProducts() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
          try {
            const products = JSON.parse(ev.target.result);
            if (Array.isArray(products)) {
              saveProducts(products);
              loadProducts();
              alert('Produktet u importuan! (' + products.length + ' produkte)');
            }
          } catch(err) {
            alert('Gabim ne skedar');
          }
        };
        reader.readAsText(file);
      };
      input.click();
    }

    function formatPrice(price) {
      return price.toFixed(2) + ' €';
    }

    function loadProducts() {
      const products = getProducts();
      const tbody = document.getElementById('productTableBody');
      const empty = document.getElementById('noProducts');
      const count = document.getElementById('product-count');

      count.textContent = products.length + ' produkte';

      if (products.length === 0) {
        tbody.innerHTML = '';
        empty.style.display = 'block';
        document.getElementById('productTable').style.display = 'none';
        return;
      }

      empty.style.display = 'none';
      document.getElementById('productTable').style.display = 'table';

      tbody.innerHTML = products.map(p => `
        <tr>
          <td><img src="${p.image}" alt="${p.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 50 50%22><rect fill=%22%23f0f0f0%22 width=%2250%22 height=%2250%22/><text x=%2225%22 y=%2230%22 text-anchor=%22middle%22 fill=%22%23ccc%22 font-size=%2220%22>📦</text></svg>'"></td>
          <td><strong>${p.name}</strong>${p.badge ? `<br><span style="font-size:11px;color:var(--primary);font-weight:600;">${p.badge.toUpperCase()}</span>` : ''}</td>
          <td>${CATEGORY_LABELS[p.category] || p.category}</td>
          <td><strong style="color:var(--primary);">${formatPrice(p.price)}</strong>${p.oldPrice ? `<br><span style="font-size:12px;color:var(--text-muted);text-decoration:line-through;">${formatPrice(p.oldPrice)}</span>` : ''}</td>
          <td>${p.shipping > 0 ? formatPrice(p.shipping) : '<span style="color:#4CAF50;">Falas</span>'}</td>
          <td>${p.stock || 0}</td>
          <td>
            <div class="actions">
              <button class="btn-secondary btn-sm" onclick="editProduct(${p.id})">✏️</button>
              <button class="btn-danger btn-sm" onclick="deleteProduct(${p.id})">🗑️</button>
            </div>
          </td>
        </tr>
      `).join('');
    }

    function openAddProduct() {
      document.getElementById('editId').value = '';
      document.getElementById('modalTitle').textContent = '➕ Shto Produkt të Ri';
      document.getElementById('productForm').reset();
      extraImages = [];
      document.getElementById('extraImagesPreview').innerHTML = '';
      document.getElementById('imgPreview').style.display = 'none';
      document.getElementById('pShipping').value = '0';
      document.getElementById('pStock').value = '10';
      document.getElementById('imgPreview').style.display = 'none';
      document.getElementById('productModal').classList.add('show');
    }

    function editProduct(id) {
      const product = getProducts().find(p => p.id === id);
      if (!product) return;
      document.getElementById('editId').value = id;
      document.getElementById('modalTitle').textContent = '✏️ Edito Produktin';
      document.getElementById('pName').value = product.name;
      document.getElementById('pCategory').value = product.category;
      document.getElementById('pBadge').value = product.badge || '';
      document.getElementById('pPrice').value = product.price;
      document.getElementById('pOldPrice').value = product.oldPrice || '';
      document.getElementById('pShipping').value = product.shipping || 0;
      document.getElementById('pStock').value = product.stock || 0;
      document.getElementById('pImage').value = product.image;
      extraImages = product.images || [];
      document.getElementById('extraImagesPreview').innerHTML = extraImages.map(img => '<img src="' + img + '" style="width:80px;height:80px;object-fit:cover;border-radius:8px;border:2px solid var(--border);">').join('');
      document.getElementById('pDescription').value = product.description || '';
      previewImage(product.image);
      document.getElementById('productModal').classList.add('show');
    }

    function closeProductModal() {
      document.getElementById('productModal').classList.remove('show');
    }

    let extraImages = [];

    function handleImageUpload(input) {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        const base64 = e.target.result;
        document.getElementById('pImage').value = base64;
        const img = document.getElementById('imgPreview');
        img.src = base64;
        img.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }

    function handleExtraImagesUpload(input) {
      const files = input.files;
      const preview = document.getElementById('extraImagesPreview');
      preview.innerHTML = '';
      extraImages = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const base64 = e.target.result;
          extraImages.push(base64);
          const img = document.createElement('img');
          img.src = base64;
          img.style.cssText = 'width:80px;height:80px;object-fit:cover;border-radius:8px;border:2px solid var(--border);';
          preview.appendChild(img);
        };
        reader.readAsDataURL(files[i]);
      }
    }

    function previewImage(url) {
      const img = document.getElementById('imgPreview');
      if (url) {
        img.src = url;
        img.style.display = 'block';
        img.onerror = () => { img.style.display = 'none'; };
      } else {
        img.style.display = 'none';
      }
    }

    function saveProduct(e) {
      if(e && e.preventDefault) e.preventDefault();
      const products = getProducts();
      const editId = document.getElementById('editId').value;
      const categoryLabels = {
        'bime-artificiale': 'Bimë Artificiale',
        'lodra-femije': 'Lodra për Fëmijë',
        'fitnesi': 'Fitnesi',
        'dekor-shtepie': 'Dekor Shtëpie',
        'per-femra': 'Për Femra',
        'ditelindja': 'Ditëlindja',
        'aksion': 'Aksion'
      };
      const cat = document.getElementById('pCategory').value;

      const productData = {
        name: document.getElementById('pName').value,
        category: cat,
        categoryLabel: categoryLabels[cat],
        badge: document.getElementById('pBadge').value,
        price: parseFloat(document.getElementById('pPrice').value),
        oldPrice: parseFloat(document.getElementById('pOldPrice').value) || 0,
        shipping: parseFloat(document.getElementById('pShipping').value) || 0,
        stock: parseInt(document.getElementById('pStock').value) || 0,
        image: document.getElementById('pImage').value,
        images: extraImages.length > 0 ? extraImages : (document.getElementById('pImage').value ? [document.getElementById('pImage').value] : []),
        description: document.getElementById('pDescription').value
      };

      if (editId) {
        // Update existing
        const idx = products.findIndex(p => p.id === parseInt(editId));
        if (idx !== -1) {
          products[idx] = { ...products[idx], ...productData };
        }
      } else {
        // Add new
        const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
        productData.id = maxId + 1;
        products.push(productData);
      }

      saveProducts(products);
      closeProductModal();
      loadProducts();
    }

    function deleteProduct(id) {
      const product = getProducts().find(p => p.id === id);
      if (!product) return;
      if (confirm(`Fshijë "${product.name}"?`)) {
        const products = getProducts().filter(p => p.id !== id);
        saveProducts(products);
        loadProducts();
      }
    }

    function resetProducts() {
      if (confirm('Rikthe produktet në vlerat fillestare? Kjo do të fshijë të gjitha ndryshimet.')) {
        localStorage.removeItem(PRODUCTS_KEY);
        loadProducts();
      }
    }

    // ===== ORDERS =====
    function getOrders() { return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'); }

    function loadOrders() {
      const orders = getOrders();
      const count = document.getElementById('order-count');
      const list = document.getElementById('ordersList');
      const stats = document.getElementById('stats-bar');

      count.textContent = orders.length + ' porosi';

      // Stats
      const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
      const totalItems = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);
      stats.innerHTML = `
        <div class="stat-card"><div class="number">${orders.length}</div><div class="label">Porosi Gjithsej</div></div>
        <div class="stat-card"><div class="number">${formatPrice(totalRevenue)}</div><div class="label">Të Ardhura</div></div>
        <div class="stat-card"><div class="number">${totalItems}</div><div class="label">Produkte të Shitura</div></div>
      `;

      if (orders.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="icon">📋</div><h3>Nuk ka porosi ende</h3><p>Porositë do të shfaqen këtu kur klientët të bëjnë porosi.</p></div>';
        return;
      }

      // Show newest first
      const sorted = [...orders].reverse();
      list.innerHTML = sorted.map(order => {
        const date = new Date(order.date).toLocaleDateString('sq-AL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        const statusClass = order.status === 'new' ? 'new' : order.status === 'processing' ? 'processing' : 'delivered';
        const statusLabel = order.status === 'new' ? 'E Re' : order.status === 'processing' ? 'Në Proces' : 'Dërguar';

        return `
          <div class="order-card">
            <div class="order-header">
              <span class="order-id">${order.id}</span>
              <span class="order-status ${statusClass}">${statusLabel}</span>
            </div>
            <div class="order-customer">
              👤 ${order.customer.firstName} ${order.customer.lastName} &nbsp;|&nbsp; 📞 ${order.customer.phone}<br>
              📍 ${order.customer.address}
              ${order.customer.notes ? `<br>📝 ${order.customer.notes}` : ''}
            </div>
            <div class="order-items">
              ${order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
            </div>
            <div class="order-total">Totali: ${formatPrice(order.total)}</div>
            <div class="order-actions">
              ${order.status === 'new' ? `<button class="btn-secondary btn-sm" onclick="updateOrderStatus('${order.id}','processing')">📦 Në Proces</button>` : ''}
              ${order.status === 'processing' ? `<button class="btn-primary btn-sm" onclick="updateOrderStatus('${order.id}','delivered')">✅ Dërguar</button>` : ''}
              <button class="btn-danger btn-sm" onclick="deleteOrder('${order.id}')">🗑️</button>
            </div>
          </div>
        `;
      }).join('');
    }

    function updateOrderStatus(id, status) {
      const orders = getOrders();
      const order = orders.find(o => o.id === id);
      if (order) {
        order.status = status;
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
        sessionStorage.setItem(ORDERS_KEY + "_backup", JSON.stringify(orders));
        loadOrders();
      }
    }

    function deleteOrder(id) {
      if (confirm('Fshijë këtë porosi?')) {
        const orders = getOrders().filter(o => o.id !== id);
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
        sessionStorage.setItem(ORDERS_KEY + "_backup", JSON.stringify(orders));
        loadOrders();
      }
    }

    function clearAllOrders() {
      if (confirm('Fshijë TË GJITHA porositë? Kjo nuk mund të zhbëhet.')) {
        localStorage.removeItem(ORDERS_KEY);
        loadOrders();
      }
    }
  