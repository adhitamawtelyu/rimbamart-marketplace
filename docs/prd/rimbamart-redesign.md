# RimbaMart Redesign PRD

## Problem
Antarmuka saat ini masih terlalu padat di elemen yang salah dan belum terasa minimalis. Fokus visual perlu dipindahkan ke produk, search, dan CTA utama.

## Goals
- Membuat tampilan lebih minimalis, rapih, dan profesional.
- Menjadikan mobile layout lebih efisien dengan 2 kolom produk.
- Mengurangi elemen dekoratif yang tidak membantu konversi.
- Menyusun ulang file agar modular dan mudah dirawat.

## Non-goals
- Tidak menambah backend baru.
- Tidak menambah fitur kompleks di luar marketplace dasar.
- Tidak mengubah brand color utama secara total.

## Information Architecture
- Header ringkas dengan brand, search, dan cart.
- Top chip navigation untuk kategori cepat.
- Hero pendek berisi promo singkat dan kategori.
- Promo/deals strip pendek.
- Katalog produk utama.
- Footer fungsional 4 kolom.
- Bottom nav untuk mobile.

## Layout Rules
- Gunakan whitespace secukupnya, bukan berlebihan.
- Card harus seragam dan mudah dipindai.
- CTA utama hanya satu: Tambah ke Keranjang / Checkout.
- Search harus dominan dan full-width.

## Mobile Rules
- Grid produk 2 kolom.
- Header diringkas jadi brand + cart di baris atas, search di baris kedua.
- Bottom nav fixed.
- Touch target minimum 44px.

## Component Changes
- Hero dipadatkan.
- Product card lebih minimal.
- Cart drawer punya footer sticky.
- Trust badges ditampilkan di halaman produk dan cart.
- Footer dipecah ke beberapa kolom.

## File Structure
- `index.html`
- `css/variables.css`
- `css/style.css`
- `js/data.js`
- `js/app.js`
- `docs/prd/rimbamart-redesign.md`

## Acceptance Criteria
- Di mobile, halaman terlihat rapih dan tidak terlalu ramai.
- Katalog menampilkan 2 kolom di layar kecil.
- Checkout CTA selalu terlihat di cart drawer.
- Struktur file terpecah dan referensi asset bekerja tanpa error.
