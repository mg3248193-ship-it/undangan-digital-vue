<template>
  <section class="hero-section">
    <span class="section-tag">Walimatul 'Urs</span>
    <h1 class="section-title gold-gradient-text">The Wedding Celebration</h1>
    
    <!-- Arch Photo Frame -->
    <div class="hero-arch-container">
      <div class="hero-arch-glow"></div>
      <div class="hero-arch-image">
        <img src="assets/images/hero.jpg" alt="Gunawan & Vista" />
      </div>
    </div>

    <h2 class="font-script" style="font-size: 3rem; color: var(--sage-deep); margin-bottom: 6px;">
      Gunawan &amp; Vista
    </h2>
    <p style="font-size: 0.95rem; font-weight: 600; color: var(--primary-gold); letter-spacing: 2px;">
      MINGGU, 1 NOVEMBER 2026
    </p>

    <!-- Holy Verse -->
    <div class="hero-verse">
      <div class="hero-verse-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <p class="hero-verse-quote">
        "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
      </p>
      <span class="hero-verse-source">(QS. Ar-Rum: 21)</span>
    </div>

    <!-- Countdown Timer -->
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

    <!-- Save to Calendar Button -->
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
</template>

<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      targetDate: new Date('2026-11-01T08:00:00+07:00').getTime(),
      countdown: {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
      },
      timerInterval: null
    };
  },
  computed: {
    calendarLink() {
      const title = encodeURIComponent('Pernikahan Gunawan & Vista');
      const details = encodeURIComponent('Akad Nikah & Resepsi Pernikahan Muhammad Gunawan & Vista Agustiningsih');
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
  }
};
</script>
