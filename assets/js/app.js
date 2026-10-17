// Main Application Entry Point for Vue 3 Digital Invitation
import { 
  CoverModal, 
  AudioPlayer, 
  HeroSection, 
  CoupleSection, 
  EventSchedule, 
  GallerySection, 
  RsvpSection, 
  DigitalGift, 
  FooterSection 
} from './components.js?v=3.2';
import { initPetals } from './petals.js?v=3.0';

const { createApp, ref, onMounted } = window.Vue;

const App = {
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
  setup() {
    const getGuestNameFromUrl = () => {
      try {
        // 1. Cari di window.location.search
        if (window.location.search) {
          const params = new URLSearchParams(window.location.search);
          const to = params.get('to') || params.get('u') || params.get('nama') || params.get('guest');
          if (to) return decodeURIComponent(to.replace(/\+/g, ' ')).trim();
        }

        // 2. Cari di window.location.hash
        if (window.location.hash) {
          const qIndex = window.location.hash.indexOf('?');
          if (qIndex !== -1) {
            const hashParams = new URLSearchParams(window.location.hash.substring(qIndex));
            const to = hashParams.get('to') || hashParams.get('u') || hashParams.get('nama') || hashParams.get('guest');
            if (to) return decodeURIComponent(to.replace(/\+/g, ' ')).trim();
          }
        }

        // 3. Fallback regex dari full URL
        const match = window.location.href.match(/[?&](?:to|u|nama|guest)=([^&#]+)/i);
        if (match && match[1]) {
          return decodeURIComponent(match[1].replace(/\+/g, ' ')).trim();
        }
      } catch (e) {
        console.warn('URL parse error:', e);
      }
      return 'Tamu Undangan';
    };

    const isOpen = ref(
      window.location.search.includes('open=true') || 
      window.location.search.includes('open=1')
    );
    const guestName = ref(getGuestNameFromUrl());
    const isPlaying = ref(false);
    const toast = ref({
      visible: false,
      message: ''
    });

    let toastTimer = null;
    let bgAudio = null;

    const showToast = (msg) => {
      if (toastTimer) clearTimeout(toastTimer);
      toast.value.message = msg;
      toast.value.visible = true;
      toastTimer = setTimeout(() => {
        toast.value.visible = false;
      }, 3000);
    };

    const openInvitation = () => {
      isOpen.value = true;
      
      // Auto-start MP3 music upon opening
      if (bgAudio) {
        bgAudio.play().then(() => {
          isPlaying.value = true;
        }).catch((err) => {
          console.warn('Autoplay error:', err);
          isPlaying.value = false;
        });
      }

      // Confetti burst
      if (window.confetti) {
        window.confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    };

    const toggleMusic = () => {
      if (bgAudio) {
        if (bgAudio.paused) {
          bgAudio.play().then(() => {
            isPlaying.value = true;
          }).catch(e => console.warn(e));
        } else {
          bgAudio.pause();
          isPlaying.value = false;
        }
      }
    };

    onMounted(() => {
      // Inisialisasi Audio MP3
      bgAudio = new Audio('assets/music_Romance.mp3');
      bgAudio.loop = true;
      bgAudio.preload = 'auto';

      initPetals();
    });

    return {
      isOpen,
      guestName,
      isPlaying,
      toast,
      openInvitation,
      toggleMusic,
      showToast
    };
  },
  template: `
    <div class="invitation-wrapper">
      <canvas id="petals-canvas"></canvas>

      <CoverModal 
        :is-open="isOpen" 
        :guest-name="guestName" 
        @open="openInvitation" 
      />

      <AudioPlayer 
        v-if="isOpen"
        :is-playing="isPlaying" 
        @toggle="toggleMusic" 
      />

      <main class="main-content">
        <HeroSection />
        <CoupleSection />
        <EventSchedule />
        <!-- <GallerySection /> -->
        <RsvpSection :guest-name="guestName" @show-toast="showToast" />
        <DigitalGift @show-toast="showToast" />
        <FooterSection />
      </main>

      <div class="toast-notification" :class="{ 'is-visible': toast.visible }">
        <span>{{ toast.message }}</span>
      </div>
    </div>
  `
};

createApp(App).mount('#app');
