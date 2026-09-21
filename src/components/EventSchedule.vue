<template>
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
      <h3 class="event-name">Akad Nikah &amp; Resepsi</h3>
      
      <div class="event-time-box">
        <span class="event-date-text">Minggu, 1 November 2026</span>
        <span class="event-clock-text">Pukul 08:00 - 18:00 WIB</span>
      </div>

      <p class="event-venue-name">Citeureup</p>
      <p class="event-venue-address">
        Jl. Mayor Oking Citeureup
      </p>

      <!-- Area Barcode QR Code Google Maps -->
      <div class="qr-section">
        <p class="qr-instruction">Scan QR Code untuk Navigasi Google Maps:</p>
        <div class="qr-canvas-container">
          <canvas ref="mapsCanvas"></canvas>
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
</template>

<script>
import QRCode from 'qrcode';

export default {
  name: 'EventSchedule',
  data() {
    return {
      mapsUrl: "https://www.google.com/maps/place/6%C2%B029'37.9%22S+106%C2%B051'42.4%22E/@-6.493862,106.8592111,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-6.493862!4d106.861786?entry=ttu"
    };
  },
  mounted() {
    this.generateQRCode();
  },
  methods: {
    async generateQRCode() {
      if (this.$refs.mapsCanvas) {
        try {
          await QRCode.toCanvas(this.$refs.mapsCanvas, this.mapsUrl, {
            width: 170,
            margin: 2,
            color: {
              dark: '#1e293b',   // Warna QR Code (Navy Gelap)
              light: '#ffffff'   // Warna Background QR Code (Putih)
            }
          });
        } catch (err) {
          console.error('Gagal men-generate QR Code:', err);
        }
      }
    }
  }
};
</script>

<style scoped>
.qr-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 18px 0 14px 0;
}

.qr-instruction {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 8px;
  font-weight: 500;
}

.qr-canvas-container {
  padding: 8px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px dashed #d4af37;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.qr-canvas-container canvas {
  display: block;
  max-width: 100%;
  height: auto !important;
  border-radius: 6px;
}
</style>
