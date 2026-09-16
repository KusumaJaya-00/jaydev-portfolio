-- ============================================================
-- SEED awal jaydev portfolio — jalankan SETELAH semua migrasi.
-- supabase/seed.sql adalah CANONICAL (idempotent).
-- Placeholder regenerate: node scripts/generate-placeholders.js
-- Konten bertema, format HTML (rich-text). renderContent() di app
-- bisa merender HTML maupun sisa markdown lama (fallback).
-- ============================================================

\set ON_ERROR_STOP on

-- ---------- projects ----------
INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, gallery, status, is_featured, sort_order)
SELECT * FROM (VALUES
(
  'ResepKu', 'resepku',
  'Aplikasi Android untuk menjelajah, mencari, dan menyimpan resep masakan Indonesia — jelajah kartu resep, filter kategori, simpan favorit offline.',
  E'<h2>Tentang ResepKu</h2><p>ResepKu adalah aplikasi Android (Kotlin) untuk menjelajah, mencari, dan menyimpan resep masakan Indonesia dalam satu genggaman. Dibuat sebagai tugas UAS Pemrograman Mobile oleh kelompok 5 orang: I Putu Adhiatman, I Komang Bayu Kurniawan, I Nyoman Pande Guna Darma, I Made Kusuma Jaya Wardana, dan Putu Ryan Raditya.</p><h2>Empat Fitur Utama</h2><h3>1. Beranda — Jelajah Semua Resep</h3><p>Saat aplikasi dibuka, semua resep tampil sebagai kartu berisi gambar, nama, dan kategori. Tinggal scroll untuk menjelajah, tarik ke bawah untuk menyegarkan daftar. Di balik layar, data resep diambil dari internet lalu ditampilkan dalam grid, dengan RecyclerView adapter yang mengubah daftar data menjadi tampilan.</p><h3>2. Pencarian dan Filter</h3><p>Ketik nama, hasil muncul huruf demi huruf tanpa perlu menekan tombol cari. Chip kategori menyaring resep — misalnya hanya menampilkan kategori "Ayam". Data yang sudah diunduh disaring di memori, jadi terasa instan.</p><h3>3. Favorit — Simpan Resep Pilihan</h3><p>Tekan ikon hati untuk menyimpan resep. Resep favorit terkumpul di tab khusus dan tetap tersimpan walau aplikasi ditutup atau sedang tanpa internet — tersimpan di database lokal SQLite di dalam HP.</p><h3>4. Detail Resep</h3><p>Semua informasi dalam satu halaman: foto resep berukuran besar beserta label kategorinya, daftar bahan lengkap, dan langkah memasak yang disusun rapi dengan nomor urut.</p><h2>Sumber Data</h2><p>ResepKu memakai dua sumber data: <strong>internet (GitHub Raw)</strong> untuk daftar resep — file JSON di GitHub diakses lewat link Raw-nya, dipakai persis seperti alamat API tanpa perlu server sendiri — dan <strong>SQLite lokal</strong> untuk resep favorit di tab Favorit yang bisa diakses tanpa koneksi internet.</p><h2>Cara Penggunaan</h2><ol><li><strong>Buka &amp; Jelajah</strong> — aplikasi terbuka di Beranda dan scroll untuk melihat resep.</li><li><strong>Cari &amp; Detail</strong> — saring atau cari resep, lalu ketuk kartunya untuk detail.</li><li><strong>Simpan Favorit</strong> — tekan ikon hati untuk menyimpan resep ke Favorit.</li></ol><h2>Teknologi</h2><ul><li>Kotlin dengan Material Design dan ViewBinding</li><li>Retrofit + Gson untuk mengambil file JSON dari GitHub Raw</li><li>Glide untuk memuat gambar resep</li><li>RecyclerView + ViewModel untuk daftar</li><li>SQLite untuk penyimpanan favorit lokal</li></ul><blockquote>Prinsip desain: semuanya alat standar Android — dipilih yang sederhana dan mudah dijelaskan.</blockquote>',
  'mobile', ARRAY['Kotlin','Retrofit','Gson','Glide','SQLite','Material']::text[],
  NULL::text, 'https://github.com/KusumaJaya-00/ResepKu'::text,
  '/images/projects/resepku/thumbnail.png',
  ARRAY[
    '/images/projects/resepku/ss-resepku-1.png',
    '/images/projects/resepku/ss-resepku-2.png',
    '/images/projects/resepku/ss-resepku-3.png',
    '/images/projects/resepku/ss-resepku-4.png'
  ]::text[],
  'published'::text, false, 9
),
(
  'Web HIMAPRODI TI', 'web-himaprodi-ti',
  'Website resmi Himpunan Mahasiswa Teknik Informatika (HIMAPRODI TI) ITB STIKOM Bali — platform manajemen organisasi: berita, agenda event, pendaftaran & pembayaran, absensi QR, sertifikat, pengurus, dan kas.',
  E'<h2>Tentang Web HIMAPRODI TI</h2><p>Web HIMAPRODI TI adalah website resmi Himpunan Mahasiswa Teknik Informatika (HIMAPRODI TI) ITB STIKOM Bali. Dibangun sebagai platform manajemen organisasi lengkap — bukan sekadar landing page — mencakup publikasi berita, agenda event, pendaftaran dan pembayaran kegiatan, absensi berbasis QR, penerbitan sertifikat, profil pengurus organisasi, dan pengelolaan kas.</p><h2>Fitur Utama</h2><h3>1. Berita &amp; Agenda</h3><p>Publikasi berita kegiatan dengan halaman detail, daftar agenda event, dan galeri foto kegiatan yang dikelola lewat panel admin. Situs juga dilengkapi sitemap.xml untuk SEO.</p><h3>2. Pendaftaran &amp; Pembayaran Event</h3><p>Mahasiswa mendaftar event online, melakukan pembayaran, dan sistem memverifikasi pembayaran — termasuk integrasi webhook pembayaran SumoPod dan verifikasi kuitansi via kode.</p><h3>3. Absensi Berbasis QR</h3><p>Absensi event menggunakan pemindaian QR code (html5-qrcode / jsQR). Peserta memindai QR pada kuitansi atau event, dan kehadiran tercatat otomatis.</p><h3>4. Sertifikat &amp; Pengurus</h3><p>Sertifikat peserta diterbitkan dan diunduh per peserta, profil pengurus organisasi ditampilkan rapi, dan kas organisasi dikelola dengan catatan transaksi.</p><h2>Teknologi</h2><ul><li>Laravel 13 (PHP 8.4) sebagai framework utama</li><li>Filament 5 untuk panel admin</li><li>Livewire 4 + Blade Components untuk frontend interaktif</li><li>Tailwind CSS 4 + DaisyUI 5 untuk styling</li><li>Google OAuth (Socialite) + email/password untuk autentikasi</li><li>spatie/laravel-permission untuk roles &amp; permissions</li><li>MySQL, queue database, PHPUnit testing</li><li>CI/CD GitHub Actions: test lalu deploy ke VPS</li></ul><blockquote>Arsitektur: business logic di app/Services, authorization via Policy — bukan ditempel di controller atau view.</blockquote>',
  'web', ARRAY['Laravel','Filament','Livewire','Tailwind CSS','DaisyUI','MySQL','Alpine.js']::text[],
  'https://himaproditi-stikom.org/'::text, NULL::text,
  '/images/projects/hima/thumbnail.png',
  ARRAY[
    '/images/projects/hima/ss-hima-home-prod.png',
    '/images/projects/hima/ss-hima-tentang-prod.png',
    '/images/projects/hima/ss-hima-berita-dev.png',
    '/images/projects/hima/ss-hima-berita-detail-1.png',
    '/images/projects/hima/ss-hima-events-dev.png',
    '/images/projects/hima/ss-hima-event-detail-2.png',
    '/images/projects/hima/ss-hima-galeri-dev.png',
    '/images/projects/hima/ss-hima-galeri-detail-1.png',
    '/images/projects/hima/ss-hima-kontak-prod.png'
  ]::text[],
  'published'::text, true, 10
),
(
  'Fixie Shop', 'fixie-shop',
  'E-commerce platform untuk jual beli sepeda fixie dan komponennya — katalog produk, filter kategori/brand/warna/ukuran, keranjang belanja, autentikasi user, dan admin panel.',
  E'<h2>Tentang Fixie Shop</h2><p>Fixie Shop adalah platform e-commerce yang dikhususkan untuk komunitas sepeda fixie di Bali. Website ini menyediakan katalog lengkap produk sepeda fixie — mulai dari frame, wheelset, sparepart, hingga aksesoris — dengan sistem filter berdasarkan kategori, brand, warna, dan ukuran.</p><h2>Fitur Utama</h2><h3>1. Katalog &amp; Filter Produk</h3><p>17 produk dari brand ternama (TSUNAMI, Engine 11, WEAPON, E11, Continental) dengan filter multi-kriteria dan sorting dinamis.</p><h3>2. Autentikasi &amp; User Management</h3><p>Sistem registrasi dan login untuk pengguna, dengan role-based access untuk admin panel.</p><h3>3. Keranjang Belanja</h3><p>Keranjang belanja dengan kalkulasi harga otomatis dan alur checkout.</p><h3>4. Admin Panel</h3><p>Panel administrasi untuk mengelola produk, kategori, dan pesanan.</p><h2>Teknologi</h2><ul><li>PHP (MVC Architecture)</li><li>SQLite / MySQL</li><li>Template Engine (Views)</li><li>RESTful Controllers</li><li>Composer (Package Manager)</li></ul>',
  'web', ARRAY['PHP','SQLite','MVC','HTML/CSS','JavaScript']::text[],
  'https://fixie-shop.jaydev.my.id/'::text, 'https://github.com/KusumaJaya-00/Fixie-Shop'::text,
  '/images/projects/fixie-shop/ss-fixie-home.png',
  ARRAY[
    '/images/projects/fixie-shop/ss-fixie-home.png',
    '/images/projects/fixie-shop/ss-fixie-products.png',
    '/images/projects/fixie-shop/ss-fixie-detail.png'
  ]::text[],
  'published'::text, false, 11
),
(
  'Minigames Flashcard HIMA TI', 'minigames-hima-ti',
  'Aplikasi kuis interaktif tebak nama dan divisi pengurus HIMA TI untuk Stand Booth GMTI 2026 — 3D card stack, audio synthesizer, leaderboard real-time, dan admin dashboard.',
  E'<h2>Tentang Minigames Flashcard HIMA TI</h2><p>Aplikasi kuis interaktif tebak nama dan divisi pengurus Himpunan Mahasiswa Program Studi Teknik Informatika (HIMA TI) yang dirancang khusus untuk Stand Booth Ospek / Gelar Mahasiswa TI (GMTI) Mahasiswa Baru 2026.</p><h2>Fitur Utama</h2><h3>1. 3D Interactive Card Stack</h3><p>Simulasi tumpukan kartu pengurus 3D dengan gestur drag/swipe, rotasi bolak-balik (front/back flip), efek fanning tumpukan, dan auto-switch kartu berkala menggunakan Framer Motion.</p><h3>2. Gameplay Flashcard Dinamis</h3><p>Animasi 3D realistis dengan efek tilt perspektif, dynamic timer bar, smart auto-distractor (pilihan ABCD cerdas berdasarkan gender dan divisi), dan mode spill jawaban.</p><h3>3. Audio Engine Lengkap</h3><p>100% Web Audio API — 4 genre BGM synthesizer (Arcade 8-Bit, Cyberpunk Synthwave, Ambient Lofi, Stadium EDM) dan 5 profil tactile SFX tanpa file audio eksternal.</p><h3>4. Command Center Admin</h3><p>Panel terproteksi PIN untuk pengaturan permainan, manajemen pengurus (CRUD), card studio simulator, manajemen leaderboard, dan backup/restore data.</p><h3>5. Dual-Mode Architecture</h3><p>Hybrid plug-and-play: Mode Static Cloud (GitHub Pages + LocalStorage) dan Mode Local Stand Server (Node.js + SQLite) untuk 100% offline.</p><h2>Teknologi</h2><ul><li>React 19 + Vite 8</li><li>Tailwind CSS v4</li><li>Framer Motion v13</li><li>Node.js 20+ / 22+</li><li>SQLite (node:sqlite / better-sqlite3)</li><li>Express.js Backend</li><li>Web Audio API Synthesizer</li><li>GitHub Pages (CI/CD Actions)</li></ul>',
  'web', ARRAY['React 19','Vite','Tailwind CSS','Framer Motion','Node.js','SQLite','Express.js']::text[],
  'https://minigames.jaydev.my.id/'::text, 'https://github.com/kusjay-space/hima-ti-minigames-ultimate'::text,
  '/images/projects/minigames/ss-mini-home.png',
  ARRAY[
    '/images/projects/minigames/ss-mini-home.png',
    '/images/projects/minigames/ss-mini-gameplay.png',
    '/images/projects/minigames/ss-mini-result.png'
  ]::text[],
  'published'::text, false, 12
)
) AS v(title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, gallery, status, is_featured, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM projects p WHERE p.slug = v.slug);

-- ---------- posts ----------
INSERT INTO posts (title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at, sort_order)
SELECT * FROM (VALUES
(
  'Arsitektur Web HIMAPRODI TI: Laravel Filament untuk Organisasi Kampus', 'arsitektur-web-himaprodi-ti',
  'Bagaimana membangun platform manajemen organisasi kampus — berita, event, pembayaran, absensi QR, sertifikat — dengan Laravel 13 dan Filament 5.',
  E'<h2>Mengapa Dibangun?</h2><p>HIMAPRODI TI ITB STIKOM Bali butuh satu platform yang menyatukan semua kegiatan organisasi: publikasi berita, agenda event, pendaftaran kegiatan, pembayaran online, absensi berbasis QR, penerbitan sertifikat, hingga pengelolaan kas. Sebelumnya, semuanya ditangani manual lewat WhatsApp dan spreadsheet.</p><h2>Teknologi yang Dipilih</h2><ul><li><strong>Laravel 13 (PHP 8.4)</strong> — framework utama, mature ecosystem, cocok untuk aplikasi organisasi</li><li><strong>Filament 5</strong> — admin panel yang powerful, CRUD otomatis, role-based access</li><li><strong>Livewire 4</strong> — frontend interaktif tanpa full SPA</li><li><strong>Tailwind CSS 4 + DaisyUI 5</strong> — styling cepat, konsisten</li><li><strong>MySQL</strong> — database relational untuk data terstruktur</li></ul><h2>Arsitektur Aplikasi</h2><h3>1. Business Logic di Services</h3><p>Semua logika bisnis ditempatkan di app/Services, bukan di controller atau view.</p><h3>2. Authorization via Policy</h3><p>Setiap resource punya Policy-nya sendiri. Role dan permission dikelola pakai spatie/laravel-permission.</p><h3>3. Fitur Utama</h3><ul><li>Berita &amp; Agenda — publikasi berita dengan halaman detail, daftar event, galeri foto</li><li>Pendaftaran &amp; Pembayaran — registrasi online, integrasi webhook SumoPod</li><li>Absensi QR — pemindaian QR code pakai html5-qrcode</li><li>Sertifikat — penerbitan dan unduhan sertifikat per peserta</li><li>Profil Pengurus — manajemen data pengurus organisasi</li><li>Kas Organisasi — pencatatan transaksi keuangan</li></ul><h2>Deployment</h2><p>CI/CD pakai GitHub Actions: test lalu deploy ke VPS.</p><blockquote>Prinsip utama: pisahkan concern. Business logic di Services, authorization di Policy, presentation di Blade/Livewire.</blockquote>',
  'tutorial', ARRAY['laravel','filament','php','organisasi']::text[],
  '/images/projects/hima/ss-hima-home-prod.png',
  'published'::text, 5, now() - interval '2 day', 0
),
(
  'React 19 + Framer Motion: Membuat 3D Interactive Card Stack', 'react-framer-motion-3d-card-stack',
  'Membangun animasi kartu pengurus 3D dengan drag, flip, dan fanning effect untuk Minigames HIMA TI.',
  E'<h2>Tantangan</h2><p>Untuk stand booth GMTI 2026, kami butuh cara visual yang menarik untuk menampilkan 34 pengurus HIMA TI. Hasilnya: 3D card stack yang bisa di-drag, di-flip, dan punya efek fanning — semua di browser tanpa WebGL.</p><h2>Teknologi</h2><ul><li><strong>React 19</strong> — component model yang clean</li><li><strong>Framer Motion v13</strong> — animasi declarative, spring physics</li><li><strong>Tailwind CSS v4</strong> — styling minimal</li></ul><h2>Cara Kerja</h2><h3>1. Stack Layout</h3><p>Kartu ditumpuk dengan offset tipis. Kartu teratas punya z-index tertinggi.</p><h3>2. Drag &amp; Swipe</h3><p>Framer Motion drag prop dengan dragConstraints. Saat drag selesai, animasi spring mengembalikan posisi.</p><h3>3. Flip Animation</h3><p>Klik kartu → rotateY dari 0 ke 180° dengan spring transition.</p><h3>4. Fanning Effect</h3><p>Saat hover, kartu-kartu di belakang menyebar dengan rotateZ dan translateX bertahap.</p><h2>Audio Engine</h2><p>Semua sound effect dihasilkan pakai Web Audio API — tanpa file audio eksternal. 4 genre BGM synthesizer dan 5 profil SFX.</p><blockquote>Tips: pakai useMotionValue untuk value yang berubah tiap frame, dan useTransform untuk map value ke CSS property.</blockquote>',
  'tutorial', ARRAY['react','framer-motion','animation','javascript']::text[],
  '/images/projects/minigames/ss-mini-home.png',
  'published'::text, 4, now() - interval '5 day', 1
),
(
  'PHP MVC dari Nol: Membangun Fixie Shop', 'php-mvc-fixie-shop',
  'E-commerce fixie bike dengan arsitektur MVC murni — tanpa framework, dari router sampai template engine.',
  E'<h2>Kenapa dari Nol?</h2><p>Fixie Shop dibangun untuk belajar arsitektur MVC murni tanpa bantuan framework seperti Laravel. Hasilnya: pemahaman mendalam tentang bagaimana framework bekerja di balik layar.</p><h2>Struktur MVC</h2><pre><code>fixie-shop/├── config/        # Database config, app config├── controllers/   # ProductController, AuthController, CartController├── models/        # Product, User, Cart, Order├── views/         # HTML templates dengan PHP├── helpers/       # Utility functions├── database/      # Schema dan migrations└── public/        # Entry point (index.php)</code></pre><h3>Router Sederhana</h3><p>public/index.php membaca URL, mencocokkan dengan route definition, dan memanggil controller yang sesuai.</p><h3>Model Layer</h3><p>Setiap model punya method untuk CRUD. Query builder manual pakai PDO dengan prepared statements.</p><h3>View Templates</h3><p>PHP biasa sebagai template engine. include untuk layout, extract() untuk pass data ke view.</p><h2>Fitur</h2><ul><li>Katalog 17 produk dengan filter kategori, brand, warna, ukuran</li><li>Sorting dinamis (harga, nama, terbaru)</li><li>Autentikasi user (register, login, logout)</li><li>Keranjang belanja dengan kalkulasi harga</li><li>Admin panel untuk CRUD produk</li></ul><h2>Pelajaran</h2><ul><li>MVC bukan sekadar folder structure — itu separation of concerns</li><li>Prepared statements wajib untuk keamanan SQL injection</li><li>Template engine itu cuma PHP yang sudah di-include</li></ul><blockquote>Framework itu kumpulan best practices yang sudah di-packaging. Tanpa framework, kamu tahu exactly apa yang terjadi.</blockquote>',
  'tutorial', ARRAY['php','mvc','ecommerce','javascript']::text[],
  '/images/projects/fixie-shop/ss-fixie-home.png',
  'published'::text, 4, now() - interval '8 day', 2
),
(
  'Next.js + Supabase: Membangun Portfolio yang Dinamis', 'nextjs-supabase-portfolio',
  'Portfolio modern dengan Next.js App Router, Supabase (Postgres + Auth + Storage), dan Tailwind v4 — semua data dari database.',
  E'<h2>Konsep</h2><p>Portfolio ini bukan statis — semua project dan blog post diambil dari Supabase (Postgres). Admin bisa tambah/edit/hapus project dan blog lewat dashboard, tanpa touch code.</p><h2>Stack</h2><ul><li><strong>Next.js 15 (App Router)</strong> — server components, streaming, ISR</li><li><strong>Supabase</strong> — Postgres, Auth, Storage, Realtime</li><li><strong>Tailwind CSS v4</strong> — utility-first styling</li><li><strong>TypeScript</strong> — type safety</li></ul><h2>Data Flow</h2><h3>Server Components</h3><p>Data di-fetch langsung di server component — tidak ada useEffect untuk data loading.</p><h3>Gallery System</h3><p>Project punya array gallery. Storage bucket images dengan public read.</p><h3>Admin Dashboard</h3><p>CRUD untuk projects dan posts. Upload gambar langsung ke Supabase Storage.</p><h2>Desain</h2><ul><li>Notch corners — clip-path untuk identitas visual</li><li>Dark theme — #06070A background, #3D7FFF accent</li><li>Dot-grid — subtle pattern di body</li><li>Glass nav — backdrop-blur untuk navigation</li></ul><blockquote>Portfolio yang baik bukan yang paling rumit, tapi yang paling jujur menunjukkan apa yang bisa kamu buat.</blockquote>',
  'tutorial', ARRAY['nextjs','supabase','portfolio','tailwind']::text[],
  '/images/projects/resepku/thumbnail.png',
  'published'::text, 4, now() - interval '12 day', 3
)
) AS v(title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM posts p WHERE p.slug = v.slug);

-- ---------- settings default ----------
INSERT INTO settings (key, value) VALUES
  ('site_title', '"jaydev"'),
  ('site_description', '"Full-Stack Developer"'),
  ('footer_text', '"© 2026 Kusjay"')
ON CONFLICT (key) DO NOTHING;
