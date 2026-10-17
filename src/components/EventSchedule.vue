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
</template>

<script>
export default {
  name: 'EventSchedule',
  data() {
    return {
      mapsUrl: "https://www.google.com/maps/place/6%C2%B029'37.9%22S+106%C2%B051'42.4%22E/@-6.493862,106.8592111,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-6.493862!4d106.861786?entry=ttu"
    };
  }
};
</script>

<style scoped>
.event-venue-address {
  font-size: clamp(0.52rem, 2.2vw, 0.76rem);
  letter-spacing: -0.35px;
  white-space: nowrap;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 20px;
  text-align: center;
  max-width: 100%;
}

.qr-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 18px 0 16px 0;
}

.qr-instruction {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 8px;
  font-weight: 500;
  text-align: center;
}

.qr-code-container,
.qr-canvas-container {
  padding: 10px;
  background: #ffffff;
  border-radius: 12px;
  border: 1.5px dashed #d4af37;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

.qr-code-container img,
.qr-canvas-container img,
.qr-code-img {
  display: block;
  width: 150px;
  height: 150px;
  border-radius: 6px;
}
</style>
