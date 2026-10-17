<template>
  <div class="cover-modal" :class="{ 'is-closed': isOpen }">
    <div class="cover-card">
      <div class="cover-border-ornament"></div>

      <!-- Header Section -->
      <div class="cover-header">
        <span class="cover-sub">The Wedding Of</span>
        <h1 class="cover-monogram">G & V</h1>
        <h2 class="cover-couple-names">Gunawan & Vista</h2>
      </div>

      <!-- Photo Frame -->
      <div class="cover-photo-frame">
        <img src="assets/images/Gunavista-7.jpeg" alt="Gunawan & Vista" />
      </div>

      <!-- Guest Personalization Box -->
      <div class="cover-guest-box">
        <p class="to-label">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
        <h3 class="guest-name">{{ displayName }}</h3>
        <p style="font-size: 0.72rem; color: rgba(255, 255, 255, 0.6); margin-top: 4px;">
          *Mohon maaf bila ada kesalahan penulisan nama/gelar
        </p>
      </div>

      <!-- Open Button -->
      <button 
        id="btn-open-invitation" 
        class="btn-open-invitation" 
        @click="handleOpen"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        <span>Buka Undangan</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoverModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    guestName: {
      type: String,
      default: ''
    }
  },
  emits: ['open'],
  computed: {
    displayName() {
      if (this.guestName && this.guestName !== 'Tamu Undangan') {
        return this.guestName;
      }
      try {
        const params = new URLSearchParams(window.location.search);
        const to = params.get('to') || params.get('u') || params.get('nama') || params.get('guest');
        if (to) return decodeURIComponent(to.replace(/\+/g, ' ')).trim();
        
        const match = window.location.href.match(/[?&](?:to|u|nama|guest)=([^&#]+)/i);
        if (match && match[1]) return decodeURIComponent(match[1].replace(/\+/g, ' ')).trim();
      } catch (e) {
        console.warn('Cover parse error:', e);
      }
      return this.guestName || 'Tamu Undangan';
    }
  },
  methods: {
    handleOpen() {
      this.$emit('open');
    }
  }
};
</script>
