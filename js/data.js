const rupiah = new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', maximumFractionDigits:0 });
const categories = ['Semua','Elektronik','Rumah','Fashion','Kecantikan','Hobi'];
const sortOptions = [
  ['relevance', 'Terpopuler'],
  ['price-asc', 'Harga terendah'],
  ['rating', 'Rating tertinggi'],
];
const products = [
  {id:1,name:'Smartwatch Active Pro',category:'Elektronik',price:629000,oldPrice:849000,rating:4.9,sold:'2,4rb terjual',tag:'Best Seller',delivery:'Tiba besok',image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'},
  {id:2,name:'Headphone ANC Nova',category:'Elektronik',price:499000,oldPrice:699000,rating:4.8,sold:'1,8rb terjual',tag:'Flash Deal',delivery:'Gratis ongkir',image:'https://images.unsplash.com/photo-1518441311531-9d5a5f9f6cf7?auto=format&fit=crop&w=900&q=80'},
  {id:3,name:'Lampu Meja Nordic',category:'Rumah',price:179000,oldPrice:239000,rating:4.7,sold:'980 terjual',tag:'Hemat',delivery:'Tiba besok',image:'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80'},
  {id:4,name:'Sneakers Urban Loop',category:'Fashion',price:359000,oldPrice:499000,rating:4.8,sold:'1,2rb terjual',tag:'Gratis Ongkir',delivery:'Tiba besok',image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'},
  {id:5,name:'Blender Kitchen Duo',category:'Rumah',price:289000,oldPrice:399000,rating:4.6,sold:'740 terjual',tag:'Limited',delivery:'Tiba besok',image:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80'},
  {id:6,name:'Serum Glow Daily',category:'Kecantikan',price:129000,oldPrice:189000,rating:4.9,sold:'3,1rb terjual',tag:'Top Rated',delivery:'Gratis ongkir',image:'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80'},
  {id:7,name:'Tas Laptop Metro 15"',category:'Fashion',price:219000,oldPrice:279000,rating:4.7,sold:'650 terjual',tag:'Baru',delivery:'Tiba besok',image:'https://images.unsplash.com/photo-1542295670-2b8205dc5b8d?auto=format&fit=crop&w=900&q=80'},
  {id:8,name:'Konsol Mini Retro',category:'Hobi',price:799000,oldPrice:999000,rating:4.9,sold:'410 terjual',tag:'Trending',delivery:'Tiba besok',image:'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=900&q=80'},
];
const quickDeals = [
  {title:'Payday Deals', copy:'Diskon singkat untuk produk yang paling laku.', image:'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?auto=format&fit=crop&w=900&q=80'},
  {title:'Rumah & Dapur', copy:'Barang penting, tampilan rapih, langsung to the point.', image:'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80'},
  {title:'Fashion Harian', copy:'Pilihan cepat untuk belanja yang nggak ribet.', image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'},
];
const trustBadges = ['Visa', 'Mastercard', 'GoPay', 'DANA', 'JNE', 'SiCepat'];
const footerLinks = [
  ['Pusat Bantuan', 'Pesanan', 'Pengembalian', 'Kebijakan Privasi'],
  ['Metode Pembayaran', 'Voucher', 'Promo', 'Gift Card'],
  ['Jasa Pengiriman', 'Lacak Pesanan', 'Biaya Kirim', 'Estimasi Tiba'],
  ['Tentang Kami', 'Karier', 'Kontak', 'Syarat & Ketentuan'],
];
const state = {
  user: JSON.parse(localStorage.getItem('rimbamart_user') || 'null'),
  cart: JSON.parse(localStorage.getItem('rimbamart_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('rimbamart_wishlist') || '[]'),
  category: 'Semua',
  sort: 'relevance',
  query: '',
  section: 'home',
};
