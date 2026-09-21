# 💍 Undangan Digital Modern & Interaktif (Vue 3)

Website undangan digital pernikahan berbasis **Vue 3** dengan desain visual modern, elegan (tema *Warm Sage & Gold*), responsif (dioptimasi untuk mobile), dan dilengkapi dengan fitur interaktif lengkap.

---

## ✨ Fitur Utama

1. **Cover / Curtain Modal (Buka Undangan)**:
   - Personalisasi nama tamu otomatis dari query URL (contoh: `?to=Nama+Tamu`).
   - Tombol *"Buka Undangan"* yang memicu animasi buka sampul, efek confetti, dan memutar instrumen musik secara otomatis.
2. **Floating Audio Control**:
   - Pemutar musik melayang dengan animasi piringan hitam (*vinyl record*) berputar.
   - Menggunakan synthesizer nada akustik piano romantis (*Canon in D progression*) via Web Audio API, sehingga dapat berjalan langsung tanpa dependensi file audio eksternal yang rentan CORS.
3. **Hero & Countdown Timer**:
   - Hitung mundur live (Hari, Jam, Menit, Detik) menuju hari acara.
   - Tombol *"Simpan ke Kalender"* terintegrasi Google Calendar.
4. **Profil Mempelai Pria & Wanita**:
   - Foto mempelai berbingkai lengkungan emas, detail orang tua, dan tautan sosial media Instagram.
5. **Jadwal Acara & Integrasi Google Maps**:
   - Sesi Akad Nikah dan Resepsi Pernikahan lengkap dengan waktu dan alamat venue.
   - Tombol langsung menuju Google Maps untuk petunjuk arah tamu.
6. **Galeri Foto Prewedding & Lightbox**:
   - Grid foto responsif dengan efek hover overlay dan modal preview gambar layar penuh (*lightbox*).
7. **Buku Tamu & RSVP Interaktif**:
   - Formulir konfirmasi kehadiran (Hadir, Ragu, Berhalangan) dan ucapan/doa restu.
   - Data ucapan langsung tersimpan di `localStorage` peramban dan memicu ledakan confetti selebrasi saat terkirim.
8. **Amplop Digital (Tanda Kasih)**:
   - Nomor rekening BCA, Mandiri, dan alamat pengiriman kado fisik.
   - Tombol *"Salin No. Rekening"* satu klik dengan notifikasi toast visual interaktif.
9. **Animasi Kelopak Bunga (Petals Canvas)**:
   - Efek kelopak bunga jatuh melayang lembut di latar belakang.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini tidak memerlukan langkah *compile* atau *build* yang rumit dan dapat langsung dijalankan:

### Opsi 1: Menggunakan Python HTTP Server (Rekomendasi)
Buka terminal di direktori proyek ini, lalu jalankan:
```bash
python3 -m http.server 5173
```
Kemudian buka peramban di:
```text
http://localhost:5173
```

### Opsi 2: Menguji Personalisasi Nama Tamu
Tambahkan parameter `?to=Nama+Tamu` pada akhir URL:
```text
http://localhost:5173/?to=Bapak+Budi+Santoso
```
atau
```text
http://localhost:5173/?to=Sahabat+Tercinta
```

---

## 📁 Struktur Direktori

```
undangan-digital-vue/
├── assets/
│   ├── css/
│   │   └── style.css            # Desain tema (Sage, Gold, Cream) & glassmorphism
│   ├── images/
│   │   ├── hero.jpg             # Foto utama kedua mempelai
│   │   ├── groom.jpg            # Foto profil pengantin pria
│   │   ├── bride.jpg            # Foto profil pengantin wanita
│   │   ├── gallery-1.jpg        # Foto cincin & momen prewedding
│   │   └── gallery-2.jpg        # Foto tawa bahagia resepsi
│   ├── js/
│   │   ├── app.js               # Entry point aplikasi Vue 3
│   │   ├── components.js        # Modul komponen Vue 3
│   │   ├── petals.js            # Animasi kanvas kelopak bunga
│   │   └── romantic-audio.js    # Mesin audio romantis Web Audio API
│   └── vendor/
│       ├── vue.global.prod.js   # Runtime lokal Vue 3
│       └── confetti.browser.min.js # Runtime lokal Confetti
├── src/
│   ├── components/              # Komponen Vue SFC (.vue)
│   │   ├── AudioPlayer.vue
│   │   ├── CoverModal.vue
│   │   ├── CoupleSection.vue
│   │   ├── DigitalGift.vue
│   │   ├── EventSchedule.vue
│   │   ├── FooterSection.vue
│   │   ├── GallerySection.vue
│   │   ├── HeroSection.vue
│   │   └── RsvpSection.vue
│   └── App.vue
├── index.html                   # Halaman utama aplikasi web
└── package.json
```
