<template>
  <div class="invitation-wrapper">
    <!-- Canvas Animasi Kelopak Bunga -->
    <canvas id="petals-canvas"></canvas>

    <!-- Cover Modal / Buka Undangan -->
    <CoverModal 
      :is-open="isOpen" 
      :guest-name="guestName" 
      @open="openInvitation" 
    />

    <!-- Floating Audio Disk -->
    <AudioPlayer 
      v-if="isOpen"
      :is-playing="isPlaying" 
      @toggle="toggleMusic" 
    />

    <!-- Main Content (Ditampilkan setelah dibuka atau untuk akses langsung) -->
    <main class="main-content">
      <HeroSection />
      <CoupleSection />
      <EventSchedule />
      <!-- <GallerySection /> -->
      <RsvpSection :guest-name="guestName" @show-toast="showToast" />
      <DigitalGift @show-toast="showToast" />
      <FooterSection />
    </main>

    <!-- Toast Feedback Notification -->
    <div class="toast-notification" :class="{ 'is-visible': toast.visible }">
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script>
import CoverModal from './components/CoverModal.vue';
import AudioPlayer from './components/AudioPlayer.vue';
import HeroSection from './components/HeroSection.vue';
import CoupleSection from './components/CoupleSection.vue';
import EventSchedule from './components/EventSchedule.vue';
import GallerySection from './components/GallerySection.vue';
import RsvpSection from './components/RsvpSection.vue';
import DigitalGift from './components/DigitalGift.vue';
import FooterSection from './components/FooterSection.vue';
import { initPetals } from '../assets/js/petals.js';

export default {
  name: 'App',
  components: {
    CoverModal,
    AudioPlayer,
    HeroSection,
    CoupleSection,
    EventSchedule,
    GallerySection,
    RsvpSection,
    DigitalGift,
    FooterSection
  },
  data() {
    return {
      isOpen: false,
      guestName: 'Tamu Undangan',
      isPlaying: false,
      bgAudio: null,
      toast: {
        visible: false,
        message: '',
        timer: null
      }
    };
  },
  created() {
    this.extractGuestName();
  },
  mounted() {
    this.bgAudio = new Audio('assets/music_Romance.mp3');
    this.bgAudio.loop = true;
    this.bgAudio.preload = 'auto';
    initPetals();
  },
  methods: {
    extractGuestName() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const to = urlParams.get('to') || urlParams.get('u') || urlParams.get('nama') || urlParams.get('guest');
        if (to) {
          this.guestName = decodeURIComponent(to.replace(/\+/g, ' '));
        }
      } catch (e) {
        console.warn('URL parse error:', e);
      }
    },
    openInvitation() {
      this.isOpen = true;
      
      // Auto-play MP3 saat buka undangan
      if (this.bgAudio) {
        this.bgAudio.play().then(() => {
          this.isPlaying = true;
        }).catch((err) => {
          console.warn('Autoplay error:', err);
          this.isPlaying = false;
        });
      }

      // Selebrasi confetti saat buka undangan
      if (window.confetti) {
        window.confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    },
    toggleMusic() {
      if (this.bgAudio) {
        if (this.bgAudio.paused) {
          this.bgAudio.play().then(() => {
            this.isPlaying = true;
          }).catch(e => console.warn(e));
        } else {
          this.bgAudio.pause();
          this.isPlaying = false;
        }
      }
    },
    showToast(msg) {
      if (this.toast.timer) clearTimeout(this.toast.timer);
      this.toast.message = msg;
      this.toast.visible = true;
      this.toast.timer = setTimeout(() => {
        this.toast.visible = false;
      }, 3200);
    }
  }
};
</script>
