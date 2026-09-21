<template>
  <section class="section gallery-section">
    <span class="section-tag">Galeri Foto</span>
    <h2 class="section-title">Our Moments</h2>
    <div class="ornament-divider">✦</div>
    <p class="section-subtitle">
      Setiap detik perjalanan kami adalah berkah yang ingin kami kenang selamanya:
    </p>

    <!-- Grid Foto -->
    <div class="gallery-grid">
      <div 
        v-for="(photo, index) in photos" 
        :key="index"
        class="gallery-item"
        @click="openLightbox(photo.src)"
      >
        <img :src="photo.src" :alt="photo.caption" loading="lazy" />
        <div class="gallery-overlay">
          <span>{{ photo.caption }}</span>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="activePhoto" class="lightbox-modal" @click.self="closeLightbox">
      <div class="lightbox-content">
        <button class="lightbox-close" @click="closeLightbox">&times;</button>
        <img :src="activePhoto" alt="Preview Foto" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
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
  methods: {
    openLightbox(src) {
      this.activePhoto = src;
    },
    closeLightbox() {
      this.activePhoto = null;
    }
  }
};
</script>
