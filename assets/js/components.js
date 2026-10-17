// Vue 3 Modular Components Definition for Browser Execution
import {
  db,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp
} from './firebase.js?v=3.0';

export const CoverModal = {
  name: 'CoverModal',
  props: {
    isOpen: Boolean,
    guestName: {
      type: String,
      default: ''
    }
  },
  emits: ['open'],
  data() {
    return {
      currentGuest: ''
    };
  },
  created() {
    this.initName();
  },
  mounted() {
    this.initName();
  },
  methods: {
    initName() {
      try {
        const p = new URLSearchParams(window.location.search);
        let n = p.get('to') || p.get('u') || p.get('nama') || p.get('guest');
        if (!n && window.location.hash) {
          const q = window.location.hash.indexOf('?');
          if (q !== -1) {
            const hp = new URLSearchParams(window.location.hash.substring(q));
            n = hp.get('to') || hp.get('u') || hp.get('nama') || hp.get('guest');
          }
        }
        if (!n) {
          const m = window.location.href.match(/[?&](?:to|u|nama|guest)=([^&#]+)/i);
          if (m && m[1]) n = m[1];
        }
        if (n) {
          this.currentGuest = decodeURIComponent(n.replace(/\+/g, ' ')).trim();
          return;
        }
      } catch (e) { }
      this.currentGuest = this.guestName && this.guestName !== 'Tamu Undangan' ? this.guestName : 'Tamu Undangan';
    }
  },
  computed: {
    displayName() {
      if (this.currentGuest && this.currentGuest !== 'Tamu Undangan') {
        return this.currentGuest;
      }
      if (this.guestName && this.guestName !== 'Tamu Undangan') {
        return this.guestName;
      }
      try {
        const p = new URLSearchParams(window.location.search);
        let n = p.get('to') || p.get('u') || p.get('nama') || p.get('guest');
        if (!n) {
          const m = window.location.href.match(/[?&](?:to|u|nama|guest)=([^&#]+)/i);
          if (m && m[1]) n = m[1];
        }
        if (n) return decodeURIComponent(n.replace(/\+/g, ' ')).trim();
      } catch (e) { }
      return 'Tamu Undangan';
    }
  },
  template: `
    <div class="cover-modal" :class="{ 'is-closed': isOpen }">
      <div class="cover-card">
        <div class="cover-border-ornament"></div>

        <div class="cover-header">
          <span class="cover-sub">The Wedding Of</span>
          <h1 class="cover-monogram">V & G</h1>
          <h2 class="cover-couple-names">Vista &amp; Gunawan</h2>
        </div>

        <div class="cover-photo-frame">
          <img src="assets/images/Gunavista-7.jpeg" alt="Vista & Gunawan" />
        </div>

        <div class="cover-guest-box">
          <p class="to-label">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
          <h3 class="guest-name">{{ displayName }}</h3>
          <p style="font-size: 0.72rem; color: rgba(255, 255, 255, 0.6); margin-top: 4px;">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        <button 
          id="btn-open-invitation" 
          class="btn-open-invitation" 
          @click="$emit('open')"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>Buka Undangan</span>
        </button>
      </div>
    </div>
  `
};

export const AudioPlayer = {
  name: 'AudioPlayer',
  props: {
    isPlaying: Boolean
  },
  emits: ['toggle'],
  template: `
    <div class="floating-audio">
      <button 
        id="btn-toggle-audio" 
        class="audio-disk" 
        :class="{ 'is-playing': isPlaying }" 
        @click="$emit('toggle')"
        title="Putar / Jeda Musik"
      >
        <svg v-if="isPlaying" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
      </button>
      <div class="audio-tooltip">
        {{ isPlaying ? 'Musik Berputar 🎵' : 'Musik Jeda ⏸️' }}
      </div>
    </div>
  `
};

export const HeroSection = {
  name: 'HeroSection',
  data() {
    return {
      targetDate: new Date('2026-11-01T08:00:00+07:00').getTime(),
      countdown: { days: '00', hours: '00', minutes: '00', seconds: '00' },
      timerInterval: null
    };
  },
  computed: {
    calendarLink() {
      const title = encodeURIComponent('Pernikahan Vista & Gunawan');
      const details = encodeURIComponent('Akad Nikah & Resepsi Pernikahan Vista Agustiningsih &Muhammad Gunawan');
      const location = encodeURIComponent('Citeureup, Jl. Mayor Oking, Bogor');
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261101T010000Z/20261101T110000Z&details=${details}&location=${location}`;
    }
  },
  mounted() {
    this.updateCountdown();
    this.timerInterval = setInterval(this.updateCountdown, 1000);
  },
  beforeUnmount() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  },
  methods: {
    updateCountdown() {
      const now = new Date().getTime();
      const diff = this.targetDate - now;
      if (diff <= 0) {
        this.countdown = { days: '00', hours: '00', minutes: '00', seconds: '00' };
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      this.countdown = {
        days: d < 10 ? '0' + d : String(d),
        hours: h < 10 ? '0' + h : String(h),
        minutes: m < 10 ? '0' + m : String(m),
        seconds: s < 10 ? '0' + s : String(s)
      };
    }
  },
  template: `
    <section class="hero-section">
      <span class="section-tag">Walimatul 'Urs</span>
      <h1 style="font-size: 1.5rem; font-weight: 600; color: var(--primary-gold); letter-spacing: 2px; margin-bottom: 24px;">The Wedding Celebration</h1>
      
      <div class="hero-arch-container">
        <div class="hero-arch-glow"></div>
        <div class="hero-arch-image">
          <img src="assets/images/Gunavista-2.png" alt="Vista & Gunawan" />
        </div>
      </div>

      <h2 class="font-script" style="font-size: 3rem; color: var(--sage-deep); margin-bottom: 6px;">
        Vista &amp; Gunawan
      </h2>
      
      <p style="font-size: 0.95rem; font-weight: 600; color: var(--primary-gold); letter-spacing: 2px;">
        MINGGU, 1 NOVEMBER 2026
      </p>

      <div class="hero-verse">
        <div class="hero-verse-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <p class="hero-verse-quote">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </p>
        <span class="hero-verse-source">(QS. Ar-Rum: 21)</span>
      </div>

      <div class="countdown-container">
        <div class="countdown-box">
          <span class="count-num">{{ countdown.days }}</span>
          <span class="count-label">Hari</span>
        </div>
        <div class="countdown-box">
          <span class="count-num">{{ countdown.hours }}</span>
          <span class="count-label">Jam</span>
        </div>
        <div class="countdown-box">
          <span class="count-num">{{ countdown.minutes }}</span>
          <span class="count-label">Menit</span>
        </div>
        <div class="countdown-box">
          <span class="count-num">{{ countdown.seconds }}</span>
          <span class="count-label">Detik</span>
        </div>
      </div>

      <a 
        id="btn-add-calendar"
        :href="calendarLink" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="btn-calendar"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>Simpan ke Kalender</span>
      </a>
    </section>
  `
};

export const CoupleSection = {
  name: 'CoupleSection',
  template: `
    <section class="section couple-section">
      <span class="section-tag">Kedua Mempelai</span>
      <h2 class="section-title">Groom &amp; Bride</h2>
      <div class="ornament-divider">✦</div>
      <p class="section-subtitle">
        Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami bermaksud menyelenggarakan pernikahan putra-putri kami:
      </p>

      <div class="couple-card">
        <div class="couple-avatar">
          <img src="assets/images/Gunavista-4.jpeg" alt="Muhammad Gunawan" />
        </div>
        <h3 class="couple-name">Muhammad Gunawan</h3>
        <p class="couple-desc">
          Putra Terakhir dari pasangan<br>
          <strong>Bpk. (Alm) H. Komarudin</strong> &amp;<br>
          <strong>Ibu (Alm) Hj. Jaenab</strong>
        </p>
        <a href="https://www.instagram.com/awannnn53/" target="_blank" rel="noopener noreferrer" class="couple-social">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>@awannnn53</span>
        </a>
      </div>

      <div class="couple-ampersand">&amp;</div>

      <div class="couple-card">
        <div class="couple-avatar">
          <img src="assets/images/Gunavista-3.png" alt="Vista Agustiningsih" />
        </div>
        <h3 class="couple-name">Vista Agustiningsih</h3>
        <p class="couple-desc">
          Putri Pertama dari pasangan<br>
          <strong>Bpk. Agus
                  </strong> &amp;<br>
          <strong>Ibu Sri Wulan</strong>
        </p>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="couple-social">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>@vistagst</span>
        </a>
      </div>
    </section>
  `
};

export const EventSchedule = {
  name: 'EventSchedule',
  data() {
    return {
      mapsUrl: "https://www.google.com/maps/place/6%C2%B029'37.9%22S+106%C2%B051'42.4%22E/@-6.493862,106.8592111,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-6.493862!4d106.861786?entry=ttu"
    };
  },
  template: `
    <section class="section event-section">
    <span class="section-tag">Waktu &amp; Tempat</span>
    <h2 class="section-title">Rangkaian Acara</h2>
    <div class="ornament-divider">✦</div>
    <p class="section-subtitle">
      Insya Allah rangkaian acara pernikahan kami akan diselenggarakan pada:
    </p>

    <!-- Sesi 1: Akad Nikah & Resepsi -->
    <div class="event-card">
      <div class="event-icon-badge">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
      </div>

      <!-- BUNGKUSAN BARU AGAR TERSUSUN KE BAWAH -->
      <div style="display: flex; flex-direction: column; gap: 24px; width: 100%; margin-bottom: 24px;">
        
        <div class="event-time-box" style="width: 100%; margin: 0;">
           <h3 class="event-name">Akad Nikah</h3>
            <span class="event-clock-text">Minggu, 01 NOVEMBER 2026</span>
           <span class="event-clock-text">Pukul 09:00 </span>
        </div>

        <div class="event-time-box" style="width: 100%; margin: 0;">
           <h3 class="event-name">Resepsi</h3>
            <span class="event-clock-text">Minggu, 01 NOVEMBER 2026</span>
          <span class="event-clock-text">Pukul 11:00 - 18:00 WIB</span>
        </div>

      </div>
      <!-- AKHIR BUNGKUSAN BARU -->

      <p class="event-venue-name">Lokasi Acara</p>
      <p class="event-venue-address">Kp. Lio Baru RT 09/09 Kel. Karang Asem Barat Kec. Citeureup - Kab. Bogor</p>

      <!-- Area Barcode QR Code Google Maps -->
      <div class="qr-section">
        <p class="qr-instruction">Scan QR Code untuk Navigasi Google Maps:</p>
        <div class="qr-code-container">
          <img 
            :src="'https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=1e293b&bgcolor=ffffff&data=' + encodeURIComponent(mapsUrl)" 
            alt="QR Code Google Maps" 
            width="150" 
            height="150"
            class="qr-code-img"
          />
        </div>
      </div>



        <!-- Tombol Link Langsung -->

        <a
        :href="mapsUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-maps"
        >

        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
        </svg>

        <span>Petunjuk Arah (Maps)</span>

        </a>

        </div>
        </section>
  `
};


export const GallerySection = {
  name: 'GallerySection',
  data() {
    return {
      activePhoto: null,
      photos: [
        { src: 'assets/images/hero.jpg', caption: 'The Promise of Forever' },
        { src: 'assets/images/gallery-1.jpg', caption: 'Two Rings, One Destined Path' },
        { src: 'assets/images/gallery-2.jpg', caption: 'Laughter & Warm Celebrations' },
        { src: 'assets/images/groom.jpg', caption: 'The Groom' },
        { src: 'assets/images/bride.jpg', caption: 'The Bride' }
      ]
    };
  },
  template: `
    <section class="section gallery-section">
      <span class="section-tag">Galeri Foto</span>
      <h2 class="section-title">Our Moments</h2>
      <div class="ornament-divider">✦</div>
      <p class="section-subtitle">
        Setiap detik perjalanan kami adalah berkah yang ingin kami kenang selamanya:
      </p>

      <div class="gallery-grid">
        <div 
          v-for="(photo, index) in photos" 
          :key="index"
          class="gallery-item"
          @click="activePhoto = photo.src"
        >
          <img :src="photo.src" :alt="photo.caption" loading="lazy" />
          <div class="gallery-overlay">
            <span>{{ photo.caption }}</span>
          </div>
        </div>
      </div>

      <div v-if="activePhoto" class="lightbox-modal" @click.self="activePhoto = null">
        <div class="lightbox-content">
          <button class="lightbox-close" @click="activePhoto = null">&times;</button>
          <img :src="activePhoto" alt="Preview Foto" />
        </div>
      </div>
    </section>
  `
};

export const RsvpSection = {
  name: 'RsvpSection',
  props: {
    guestName: {
      type: String,
      default: ''
    }
  },
  emits: ['show-toast'],
  data() {
    return {
      isSubmitting: false,
      isLoading: true,
      form: {
        name: this.guestName || '',
        status: 'hadir',
        pax: '1',
        message: ''
      },
      wishes: []
    };
  },
  watch: {
    guestName(val) {
      if (val && val !== 'Tamu Undangan' && !this.form.name) {
        this.form.name = val;
      }
    }
  },
  mounted() {
    this.listenToWishes();
  },
  methods: {
    listenToWishes() {
      try {
        const q = query(
          collection(db, 'wishes'),
          orderBy('createdAt', 'desc'),
          limit(50)
        );

        onSnapshot(q, (snapshot) => {
          this.isLoading = false;
          if (snapshot.empty) {
            this.wishes = this.getDefaultWishes();
          } else {
            this.wishes = snapshot.docs.map(doc => {
              const data = doc.data();
              return {
                id: doc.id,
                name: data.name || 'Tamu',
                status: data.status || 'hadir',
                pax: data.pax || '1',
                message: data.message || '',
                date: this.formatTimeAgo(data.createdAt?.toDate())
              };
            });
          }
        }, (error) => {
          console.warn('Firestore snapshot warning (fallback to local):', error);
          this.isLoading = false;
          this.loadLocalWishes();
        });
      } catch (e) {
        console.warn('Firestore init error:', e);
        this.isLoading = false;
        this.loadLocalWishes();
      }
    },
    loadLocalWishes() {
      const stored = localStorage.getItem('wedding_wishes_vue');
      if (stored) {
        try {
          this.wishes = JSON.parse(stored);
        } catch (e) {
          this.wishes = this.getDefaultWishes();
        }
      } else {
        this.wishes = this.getDefaultWishes();
      }
    },
    getDefaultWishes() {
      return [];
    },
    statusLabel(status) {
      if (status === 'hadir') return 'Hadir';
      if (status === 'ragu') return 'Masih Ragu';
      return 'Berhalangan';
    },
    formatTimeAgo(date) {
      if (!date) return 'Baru saja';
      const seconds = Math.floor((new Date() - date) / 1000);
      if (seconds < 60) return 'Baru saja';
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes} menit yang lalu`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours} jam yang lalu`;
      const days = Math.floor(hours / 24);
      return `${days} hari yang lalu`;
    },
    async handleSubmit() {
      if (!this.form.name.trim() || !this.form.message.trim() || this.isSubmitting) return;

      this.isSubmitting = true;
      try {
        await addDoc(collection(db, 'wishes'), {
          name: this.form.name.trim(),
          status: this.form.status,
          pax: this.form.status === 'hadir' ? this.form.pax : '0',
          message: this.form.message.trim(),
          createdAt: serverTimestamp()
        });

        if (window.confetti) {
          window.confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
          });
        }

        this.$emit('show-toast', '✓ Terima kasih! Ucapan & konfirmasi Anda berhasil dikirim.');
        this.form.message = '';
      } catch (err) {
        console.error('Submit Firestore error:', err);
        const newWish = {
          name: this.form.name.trim(),
          status: this.form.status,
          message: this.form.message.trim(),
          date: 'Baru saja'
        };
        this.wishes.unshift(newWish);
        localStorage.setItem('wedding_wishes_vue', JSON.stringify(this.wishes));
        this.$emit('show-toast', '✓ Ucapan Anda berhasil dicatat.');
        this.form.message = '';
      } finally {
        this.isSubmitting = false;
      }
    }
  },
  template: `
    <section class="section rsvp-section">
      <span class="section-tag">Buku Tamu &amp; Kehadiran</span>
      <h2 class="section-title">RSVP &amp; Ucapan</h2>
      <div class="ornament-divider">✦</div>
      <p class="section-subtitle">
        Kehadiran dan doa restu Anda merupakan suatu kehormatan dan kebahagiaan yang sangat berarti bagi kami:
      </p>

      <div class="rsvp-card">
        <form id="rsvp-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label class="form-label" for="rsvp-name">Nama Lengkap</label>
            <input 
              id="rsvp-name" 
              v-model="form.name" 
              type="text" 
              class="form-input" 
              placeholder="Masukkan nama Anda" 
              required 
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="rsvp-status">Konfirmasi Kehadiran</label>
            <select id="rsvp-status" v-model="form.status" class="form-select" required>
              <option value="hadir">Ya, Saya Akan Hadir</option>
              <option value="ragu">Masih Ragu-ragu</option>
              <option value="tidak">Maaf, Berhalangan Hadir</option>
            </select>
          </div>

          <div v-if="form.status === 'hadir'" class="form-group">
            <label class="form-label" for="rsvp-pax">Jumlah Tamu</label>
            <select id="rsvp-pax" v-model="form.pax" class="form-select">
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="rsvp-message">Ucapan &amp; Doa Restu</label>
            <textarea 
              id="rsvp-message" 
              v-model="form.message" 
              class="form-textarea" 
              placeholder="Tuliskan ucapan dan doa terbaik untuk kedua mempelai..."
              required
            ></textarea>
          </div>

          <button type="submit" id="btn-submit-rsvp" class="btn-submit-rsvp" :disabled="isSubmitting">
            <span v-if="isSubmitting">⏳ Mengirimkan...</span>
            <span v-else>💌 Kirim Ucapan &amp; Konfirmasi</span>
          </button>
        </form>
      </div>

      <div class="wishes-container">
        <div 
          v-for="(wish, index) in wishes" 
          :key="wish.id || index"
          class="wish-item"
        >
          <div class="wish-header">
            <span class="wish-author">{{ wish.name }}</span>
            <span 
              class="wish-badge"
              :class="{
                'badge-hadir': wish.status === 'hadir',
                'badge-ragu': wish.status === 'ragu',
                'badge-tidak': wish.status === 'tidak'
              }"
            >
              {{ statusLabel(wish.status) }}
            </span>
          </div>
          <p class="wish-text">{{ wish.message }}</p>
          <span class="wish-date">{{ wish.date }}</span>
        </div>
      </div>
    </section>
  `
};

export const DigitalGift = {
  name: 'DigitalGift',
  emits: ['show-toast'],
  data() {
    return {
      currentTab: 'gopay',
      gopayNumber: '089698731582'
    };
  },
  methods: {
    copyToClipboard(text, label) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          this.$emit('show-toast', `✓ ${label} berhasil disalin!`);
        }).catch(() => {
          this.fallbackCopy(text, label);
        });
      } else {
        this.fallbackCopy(text, label);
      }
    },
    fallbackCopy(text, label) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.$emit('show-toast', `✓ ${label} berhasil disalin!`);
    }
  },
  template: `
    <section class="section gift-section">
      <span class="section-tag">Tanda Kasih</span>
      <h2 class="section-title">Amplop Digital</h2>
      <div class="ornament-divider">✦</div>
      <p class="section-subtitle">
        Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih berupa kado digital, Anda dapat melalui:
      </p>

      <div class="gift-tabs">
        <button 
          class="gift-tab-btn" 
          :class="{ active: currentTab === 'gopay' }"
          @click="currentTab = 'gopay'"
        >
          GoPay
        </button>
        <button 
          class="gift-tab-btn" 
          :class="{ active: currentTab === 'bca' }"
          @click="currentTab = 'bca'"
        >
          BCA
        </button>
        <button 
          class="gift-tab-btn" 
          :class="{ active: currentTab === 'kado' }"
          @click="currentTab = 'kado'"
        >
          Kado Fisik
        </button>
      </div>

      <!-- Tab GoPay Gunawan -->
      <div v-if="currentTab === 'gopay'" class="gift-card" style="text-align: center;">
        <div class="gift-card-logo">
          <span>GOPAY</span>
          <span style="font-size: 0.75rem; background: rgba(0, 174, 239, 0.2); color: #38bdf8; padding: 4px 8px; border-radius: 6px; font-weight: 600;">E-Wallet</span>
        </div>

        <!-- Barcode / QR Code GoPay -->
        <div style="background: #ffffff; padding: 12px; border-radius: 12px; display: inline-flex; flex-direction: column; align-items: center; margin-bottom: 14px; box-shadow: 0 4px 14px rgba(0,0,0,0.2);">
          <img 
            :src="'https://api.qrserver.com/v1/create-qr-code/?size=160x160&color=0f172a&bgcolor=ffffff&data=' + encodeURIComponent(gopayNumber)" 
            alt="Barcode QR Code GoPay Gunawan" 
            width="150" 
            height="150"
            style="display: block; border-radius: 4px;"
          />
          <span style="font-size: 0.7rem; color: #64748b; margin-top: 6px; font-weight: 600;">Scan QR GoPay</span>
        </div>

        <div class="gift-card-number">{{ gopayNumber }}</div>
        <div class="gift-card-holder">a.n Muhammad Gunawan</div>

        <button 
          id="btn-copy-gopay" 
          class="btn-copy-account" 
          @click="copyToClipboard(gopayNumber, 'Nomor GoPay')"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Salin No. GoPay</span>
        </button>
      </div>

      <div v-if="currentTab === 'bca'" class="gift-card">
        <div class="gift-card-logo">
          <span>BCA</span>
          <div class="chip-sim"></div>
        </div>
        <div class="gift-card-number">3423374175</div>
        <div class="gift-card-holder">a.n Vista Agustiningsih</div>
        <button 
          id="btn-copy-bca-vista" 
          class="btn-copy-account" 
          @click="copyToClipboard('3423374175', 'Nomor rekening BCA')"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Salin No. Rekening</span>
        </button>
      </div>

      <div v-if="currentTab === 'kado'" class="physical-gift-card">
        <h3 style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--sage-deep); margin-bottom: 8px;">
          Alamat Pengiriman Kado
        </h3>
        <p style="font-size: 0.85rem; color: var(--text-dark); margin-bottom: 12px; line-height: 1.5;">
          Penerima: Vista Agustiningsih / Muhammad Gunawan<br>
          Kp Lio Baru RT 09/09 no 64 kelurahan karang asem barat kec citeureup<br>
          (Telp: 0877-9012-0004)
        </p>
        <button 
          id="btn-copy-address" 
          class="btn-copy-account" 
          @click="copyToClipboard('Kp Lio Baru RT 09/09 no 64 kelurahan karang asem barat kec citeureup (Penerima: Vista/Gunawan - 087790120004)', 'Alamat pengiriman kado')"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Salin Alamat</span>
        </button>
      </div>
    </section>
  `
};

export const FooterSection = {
  name: 'FooterSection',
  template: `
    <footer class="footer-section">
      <div class="ornament-divider" style="margin-bottom: 16px;">✦</div>
      <p class="footer-closing-text">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
      </p>

      <div class="footer-couple-name">Gunawan &amp; Vista</div>

      <div class="footer-families">
        Kami yang berbahagia,<br>
        <strong>Keluarga Besar Bpk. (alm) H. Komarudin &amp; Ibu (alm) Hj. Jaenab Jaenabun</strong><br>
        <strong>Keluarga Besar Bpk. Agus  &amp;  Ibu Sri Wulan</strong>
      </div>

      <div class="footer-copyright">
        &copy; 2026 Gunawan &amp; Vista Wedding &bull; Built with Vue.js
      </div>

     
    </footer>
  `
};
