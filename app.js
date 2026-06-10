const el = {
      year:document.getElementById('year'), topbar:document.querySelector('[data-topbar]'), searchInput:document.getElementById('searchInput'), searchBtn:document.getElementById('searchBtn'),
      topChips:document.getElementById('topChips'), sidebarCats:document.getElementById('sidebarCats'), inlineChips:document.getElementById('inlineChips'), sortChips:document.getElementById('sortChips'), filterList:document.getElementById('filterList'),
      productGrid:document.getElementById('productGrid'), recommendations:document.getElementById('recommendations'), resultCount:document.getElementById('resultCount'), cartCount:document.getElementById('cartCount'),
      cartBtn:document.getElementById('cartBtn'), cartDrawer:document.getElementById('cartDrawer'), drawerOverlay:document.getElementById('drawerOverlay'), closeCart:document.getElementById('closeCart'), cartItems:document.getElementById('cartItems'), cartSubtotal:document.getElementById('cartSubtotal'), shipBar:document.getElementById('shipBar'), clearCartBtn:document.getElementById('clearCartBtn'), checkoutBtn:document.getElementById('checkoutBtn'), cartUserState:document.getElementById('cartUserState'),
      loginBtn:document.getElementById('loginBtn'), footerLoginBtn:document.getElementById('footerLoginBtn'), quickLoginBtn:document.getElementById('quickLoginBtn'), authModal:document.getElementById('authModal'), modalOverlay:document.getElementById('modalOverlay'), closeAuth:document.getElementById('closeAuth'), authForm:document.getElementById('authForm'), email:document.getElementById('email'), password:document.getElementById('password'), name:document.getElementById('name'), authSubtitle:document.getElementById('authSubtitle'),
      mobileHome:document.getElementById('mobileHome'), mobileSearch:document.getElementById('mobileSearch'), mobileCart:document.getElementById('mobileCart'), mobileProfile:document.getElementById('mobileProfile')
    };

    function save(){ localStorage.setItem('rimbamart_user', JSON.stringify(state.user)); localStorage.setItem('rimbamart_cart', JSON.stringify(state.cart)); localStorage.setItem('rimbamart_wishlist', JSON.stringify(state.wishlist)); }
    function openAuth(){ el.authModal.classList.add('open'); el.modalOverlay.classList.add('open'); document.body.classList.add('locked'); el.email.focus(); }
    function closeAuth(){ el.authModal.classList.remove('open'); el.modalOverlay.classList.remove('open'); document.body.classList.remove('locked'); }
    function openCart(){ el.cartDrawer.classList.add('open'); el.drawerOverlay.classList.add('open'); document.body.classList.add('locked'); }
    function closeCart(){ el.cartDrawer.classList.remove('open'); el.drawerOverlay.classList.remove('open'); document.body.classList.remove('locked'); }
    function setUserUI(){ const active = !!state.user; el.loginBtn.innerHTML = active ? '<span>Akun saya</span><small>· '+(state.user.name||'Member')+'</small>' : '<span>Masuk</span><small>· Akun</small>'; el.footerLoginBtn.textContent = active ? 'Akun saya' : 'Masuk'; el.cartUserState.textContent = active ? `Halo, ${state.user.name || 'Member'}` : 'Belum login'; el.authSubtitle.textContent = active ? `Login aktif sebagai ${state.user.email}` : 'Masuk untuk wishlist, cart, dan checkout.'; }
    function filtered(){ let items = [...products]; if(state.category !== 'Semua') items = items.filter(p => p.category === state.category); if(state.query.trim()){ const q=state.query.toLowerCase(); items = items.filter(p => `${p.name} ${p.category} ${p.tag}`.toLowerCase().includes(q)); } if(state.sort==='price-asc') items.sort((a,b)=>a.price-b.price); if(state.sort==='rating') items.sort((a,b)=>b.rating-a.rating); return items; }
    function renderChips(){ const build = target => categories.map(c => `<button class="chip ${state.category===c?'active':''}" data-category="${c}" type="button">${c}</button>`).join(''); el.topChips.innerHTML = build(); el.inlineChips.innerHTML = build(); el.sidebarCats.innerHTML = categories.map(c => `<button class="sidebar-item ${state.category===c?'active':''}" data-category="${c}" type="button"><span>${c}</span><span>${c==='Semua'?products.length:products.filter(p=>p.category===c).length}</span></button>`).join(''); el.filterList.innerHTML = categories.map(c => `<button class="filter-row ${state.category===c?'active':''}" data-category="${c}" type="button"><span>${c}</span><span>${c==='Semua'?products.length:products.filter(p=>p.category===c).length}</span></button>`).join(''); }
    function renderSort(){ const sorts = [['relevance','Terpopuler'],['price-asc','Harga terendah'],['rating','Rating tertinggi']]; el.sortChips.innerHTML = sorts.map(([key,label]) => `<button class="chip alt ${state.sort===key?'active':''}" data-sort="${key}" type="button">${label}</button>`).join(''); }
    function renderProducts(){ const items = filtered(); el.resultCount.textContent = `${items.length} produk ditemukan`; el.productGrid.innerHTML = items.map(p => `
      <article class="card product" data-detail="${p.id}">
        <div class="product-media">
          <span class="badge">${p.tag}</span>
          <button class="wish ${state.wishlist.includes(p.id)?'active':''}" data-wish="${p.id}" aria-label="Favorit ${p.name}" type="button">♥</button>
          <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="product-body">
          <h3 class="title">${p.name}</h3>
          <div class="price-row"><strong class="price">${rupiah.format(p.price)}</strong><span class="old">${rupiah.format(p.oldPrice)}</span></div>
          <div class="rating">★ ${p.rating} <span style="color:var(--muted);font-weight:700">${p.sold}</span></div>
          <div class="meta-row"><span>${p.category}</span><span class="delivery">${p.delivery}</span></div>
          <button class="buy" data-add="${p.id}" type="button">Tambah ke keranjang</button>
        </div>
      </article>`).join('') || `<div class="card" style="grid-column:1/-1;padding:18px">Tidak ada produk cocok. Coba ubah pencarian atau kategori.</div>`; }
    function renderRecommendations(){ const picks = [products[0],products[2],products[5]]; el.recommendations.innerHTML = picks.map(p => `<div class="row-item"><div class="thumb"><img src="${p.image}" alt="${p.name}"></div><div><h4>${p.name}</h4><p>${p.category} · ${rupiah.format(p.price)} · ★ ${p.rating}</p></div><button class="btn" data-add="${p.id}" type="button" style="min-height:38px;background:#ff9900;color:#111">Tambah</button></div>`).join(''); }
    function totalPrice(){ return state.cart.reduce((sum, i) => sum + products.find(p => p.id === i.id).price * i.qty, 0); }
    function renderCart(){ el.cartCount.textContent = state.cart.reduce((n,i)=>n+i.qty,0); const subtotal = totalPrice(); el.cartItems.innerHTML = state.cart.map(i => { const p=products.find(x=>x.id===i.id); return `<div class="cart-row"><div class="thumb"><img src="${p.image}" alt="${p.name}"></div><div><strong style="display:block;font-size:14px;margin-bottom:4px">${p.name}</strong><div style="color:var(--muted);font-size:13px">${rupiah.format(p.price)} × ${i.qty}</div></div><div class="qty"><button data-dec="${i.id}" type="button">−</button><strong>${i.qty}</strong><button data-inc="${i.id}" type="button">+</button></div></div>`; }).join('') || '<div class="card" style="padding:16px"><strong>Keranjang kosong.</strong><p style="margin:8px 0 0;color:var(--muted)">Tambahkan produk dari halaman utama.</p></div>'; el.cartSubtotal.textContent = rupiah.format(subtotal); const remaining = Math.max(0, 500000 - subtotal); const pct = Math.min(100, (subtotal / 500000) * 100); el.shipBar.style.width = pct + '%'; el.shipBar.title = remaining > 0 ? `Tambah ${rupiah.format(remaining)} untuk gratis ongkir` : 'Gratis ongkir tercapai'; }
    function addToCart(id){ const item = state.cart.find(x => x.id===id); if(item) item.qty++; else state.cart.push({id, qty:1}); save(); renderCart(); }
    function qty(id, delta){ const item = state.cart.find(x => x.id===id); if(!item) return; item.qty += delta; state.cart = state.cart.filter(x => x.qty>0); save(); renderCart(); }
    function toggleWish(id){ state.wishlist = state.wishlist.includes(id) ? state.wishlist.filter(x => x!==id) : [...state.wishlist, id]; save(); renderProducts(); }
    function bindCategory(btn){ const c = btn?.dataset?.category; if(!c) return; state.category = c; renderChips(); renderSort(); renderProducts(); }
    function handleSubmit(e){ e.preventDefault(); const email = el.email.value.trim(); const pass = el.password.value.trim(); if(!email || pass.length < 6){ alert('Email harus diisi dan password minimal 6 karakter.'); return; } state.user = { email, name: el.name.value.trim() || email.split('@')[0] }; save(); setUserUI(); closeAuth(); }
    function setNavActive(id){ document.querySelectorAll('.bottom-nav button').forEach(btn => btn.classList.toggle('active', btn.dataset.nav === id)); }

    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-category],[data-sort],[data-add],[data-dec],[data-inc],[data-wish],[data-detail]');
      if(!t) return;
      if(t.dataset.category) return bindCategory(t);
      if(t.dataset.sort){ state.sort = t.dataset.sort; renderSort(); renderProducts(); }
      if(t.dataset.add) addToCart(Number(t.dataset.add));
      if(t.dataset.dec) qty(Number(t.dataset.dec), -1);
      if(t.dataset.inc) qty(Number(t.dataset.inc), 1);
      if(t.dataset.wish){ e.stopPropagation(); toggleWish(Number(t.dataset.wish)); }
      if(t.dataset.detail){ const p = products.find(x=>x.id===Number(t.dataset.detail)); alert(`${p.name}\n${p.category} · ${rupiah.format(p.price)}\nRating ${p.rating} · ${p.sold}`); }
    });
    document.addEventListener('click', (e) => { const card = e.target.closest('.product'); if(card && !e.target.closest('button')) { const p = products.find(x=>x.id===Number(card.dataset.detail)); alert(`${p.name}\n${p.category} · ${rupiah.format(p.price)}`); } });
    el.searchInput.addEventListener('input', (e)=>{ state.query = e.target.value; renderProducts(); });
    el.searchBtn.addEventListener('click', ()=> renderProducts());
    el.loginBtn.addEventListener('click', openAuth); el.footerLoginBtn.addEventListener('click', openAuth); el.quickLoginBtn.addEventListener('click', openAuth);
    el.cartBtn.addEventListener('click', openCart); el.closeCart.addEventListener('click', closeCart); el.drawerOverlay.addEventListener('click', closeCart);
    el.closeAuth.addEventListener('click', closeAuth); el.modalOverlay.addEventListener('click', ()=>{ closeAuth(); closeCart(); });
    el.authForm.addEventListener('submit', handleSubmit); el.clearCartBtn.addEventListener('click', ()=>{ state.cart = []; save(); renderCart(); });
    el.checkoutBtn.addEventListener('click', ()=>{ if(!state.user){ openAuth(); return; } if(!state.cart.length){ alert('Keranjang masih kosong.'); return; } alert(`Checkout demo siap untuk ${state.user.name || 'Member'}. Total item: ${state.cart.reduce((n,i)=>n+i.qty,0)}`); });
    window.addEventListener('keydown', e=>{ if(e.key==='Escape'){ closeAuth(); closeCart(); } });
    window.addEventListener('scroll', ()=> el.topbar.classList.toggle('scrolled', window.scrollY > 6));
    el.mobileHome.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'})); el.mobileSearch.addEventListener('click', ()=> el.searchInput.focus()); el.mobileCart.addEventListener('click', openCart); el.mobileProfile.addEventListener('click', ()=> state.user ? alert(`Akun aktif: ${state.user.email}`) : openAuth());

    const io = new IntersectionObserver(entries => { entries.forEach(entry => { if(entry.isIntersecting){ setNavActive(entry.target.id); } }); }, { threshold: .35 });
    io.observe(document.getElementById('home')); io.observe(document.getElementById('catalog'));

    closeAuth(); closeCart(); document.body.classList.remove('locked');
    el.year.textContent = new Date().getFullYear(); renderChips(); renderSort(); renderProducts(); renderRecommendations(); renderCart(); setUserUI(); setNavActive('home');
  