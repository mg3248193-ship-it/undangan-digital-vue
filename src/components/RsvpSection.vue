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

        <button type="submit" id="btn-submit-rsvp" class="btn-submit-rsvp">
          💌 Kirim Ucapan &amp; Konfirmasi
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
export default {
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
    this.loadWishes();
  },
  methods: {
    loadWishes() {
      const stored = localStorage.getItem('wedding_wishes_vue');
      if (stored) {
        try {
          this.wishes = JSON.parse(stored);
        } catch (e) {
          this.wishes = this.getDefaultWishes();
        }
      } else {
        this.wishes = this.getDefaultWishes();
        localStorage.setItem('wedding_wishes_vue', JSON.stringify(this.wishes));
      }
    },
    getDefaultWishes() {
      return [
        {
          name: 'Dimas Aditya',
          status: 'hadir',
          message: 'Barakallahu lakum wa baraka alaikum! Selamat menempuh hidup baru Rizky & Amanda, semoga senantiasa sakinah mawaddah warahmah.',
          date: '1 jam yang lalu'
        },
        {
          name: 'Siti Sarah & Keluarga',
          status: 'hadir',
          message: 'Selamat berbahagia Manda dan Mas Rizky! Lancar-lancar sampai hari H ya, insya Allah kami sekeluarga hadir.',
          date: '3 jam yang lalu'
        },
        {
          name: 'Budi Kurniawan',
          status: 'ragu',
          message: 'Selamat Rizky & Amanda! Masih diusahakan jadwal cutinya, semoga bisa hadir merayakan momen bahagia ini.',
          date: '5 jam yang lalu'
        }
      ];
    },
    statusLabel(status) {
      if (status === 'hadir') return 'Hadir';
      if (status === 'ragu') return 'Masih Ragu';
      return 'Berhalangan';
    },
    handleSubmit() {
      if (!this.form.name.trim() || !this.form.message.trim()) return;

      const newWish = {
        name: this.form.name.trim(),
        status: this.form.status,
        message: this.form.message.trim(),
        date: 'Baru saja'
      };

      this.wishes.unshift(newWish);
      localStorage.setItem('wedding_wishes_vue', JSON.stringify(this.wishes));

      // Trigger Confetti if canvas-confetti is loaded
      if (window.confetti) {
        window.confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }

      this.$emit('show-toast', '✓ Terima kasih! Ucapan & konfirmasi Anda berhasil dikirim.');

      // Reset form message
      this.form.message = '';
    }
  }
};
</script>
