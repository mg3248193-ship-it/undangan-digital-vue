<template>
  <section class="section rsvp-section">
    <span class="section-tag">Buku Tamu &amp; Kehadiran</span>
    <h2 class="section-title">RSVP &amp; Ucapan</h2>
    <div class="ornament-divider">✦</div>
    <p class="section-subtitle">
      Kehadiran dan doa restu Anda merupakan suatu kehormatan dan kebahagiaan yang sangat berarti bagi kami:
    </p>

    <!-- Formulir RSVP -->
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

    <!-- Feed Doa & Ucapan -->
    <div class="wishes-container">
      <div 
        v-for="(wish, index) in wishes" 
        :key="index"
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
</template>

<script>
import { 
  db, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from '../assets/js/firebase.js';

export const RsvpSection = {
  name: 'RsvpSection',
  props: { guestName: { type: String, default: '' } },
  emits: ['show-toast'],
  data() {
    return {
      isSubmitting: false,
      form: {
        name: this.guestName || '',
        status: 'hadir',
        pax: '1',
        message: ''
      },
      wishes: []
    };
  },
  mounted() {
    this.listenToWishes();
  },
  methods: {
    // 1. Ambil data secara LIVE dari Firestore
    listenToWishes() {
      const q = query(
        collection(db, 'wishes'), 
        orderBy('createdAt', 'desc'), 
        limit(50)
      );
      
      onSnapshot(q, (snapshot) => {
        this.wishes = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            status: data.status,
            pax: data.pax || '1',
            message: data.message,
            date: this.formatTimeAgo(data.createdAt?.toDate())
          };
        });
      }, (error) => {
        console.error('Firestore Error:', error);
      });
    },
    // 2. Kirim ucapan ke Firestore
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
          window.confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        }
        this.$emit('show-toast', '✓ Terima kasih! Ucapan & konfirmasi Anda berhasil dikirim.');
        this.form.message = '';
      } catch (err) {
        console.error(err);
        this.$emit('show-toast', '⚠️ Gagal mengirim ucapan, silakan coba lagi.');
      } finally {
        this.isSubmitting = false;
      }
    },
    formatTimeAgo(date) {
      if (!date) return 'Baru saja';
      const seconds = Math.floor((new Date() - date) / 1000);
      if (seconds < 60) return 'Baru saja';
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes} menit lalu`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours} jam lalu`;
      const days = Math.floor(hours / 24);
      return `${days} hari lalu`;
    },
    statusLabel(status) {
      if (status === 'hadir') return 'Hadir';
      if (status === 'ragu') return 'Masih Ragu';
      return 'Berhalangan';
    }
  },
  // Template tetap sama, hanya menambahkan :disabled="isSubmitting" pada button submit
};
</script>
