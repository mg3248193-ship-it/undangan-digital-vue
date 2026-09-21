<template>
  <section class="section gift-section">
    <span class="section-tag">Tanda Kasih</span>
    <h2 class="section-title">Amplop Digital</h2>
    <div class="ornament-divider">✦</div>
    <p class="section-subtitle">
      Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih berupa kado digital, Anda dapat melalui:
    </p>

    <!-- Tab Pilihan Rekening / E-Wallet -->
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
        Bank BCA
      </button>
      <button 
        class="gift-tab-btn" 
        :class="{ active: currentTab === 'kado' }"
        @click="currentTab = 'kado'"
      >
        Kado Fisik
      </button>
    </div>

    <!-- Tab GoPay (Gunawan) -->
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

    <!-- Tab BCA (Vista) -->
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

    <!-- Tab Kado Fisik -->
    <div v-if="currentTab === 'kado'" class="physical-gift-card">
      <h3 style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--sage-deep); margin-bottom: 8px;">
        Alamat Pengiriman Kado
      </h3>
      <p style="font-size: 0.85rem; color: var(--text-dark); margin-bottom: 12px; line-height: 1.5;">
        Penerima: Vista Agustiningsih / Muhammad Gunawan<br>
        Kp Lio Baru RT 09/09 no 64 kelurahan karang asem barat kec citeureup<br>
        (Telp: 0812-3456-7890)
      </p>
      <button 
        id="btn-copy-address" 
        class="btn-copy-account" 
        @click="copyToClipboard('Kp Lio Baru RT 09/09 no 64 kelurahan karang asem barat kec citeureup (Penerima: Vista/Gunawan - 081234567890)', 'Alamat pengiriman kado')"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span>Salin Alamat</span>
      </button>
    </div>
  </section>
</template>

<script>
export default {
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
  }
};
</script>
