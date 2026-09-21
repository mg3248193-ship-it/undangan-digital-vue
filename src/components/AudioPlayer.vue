<template>
  <div class="floating-audio">
    <button 
      id="btn-toggle-audio" 
      class="audio-disk" 
      :class="{ 'is-playing': isPlaying }" 
      @click="toggleAudio"
      title="Putar / Hentikan Musik"
    >
      <svg v-if="isPlaying" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
      <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
      </svg>
    </button>
    <div class="audio-tooltip">
      {{ isPlaying ? 'Musik Berputar 🎵' : 'Musik Jeda ⏸️' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle'],
  methods: {
    toggleAudio() {
      this.$emit('toggle');
    }
  }
};
</script>
