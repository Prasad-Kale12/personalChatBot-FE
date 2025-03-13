<template>
    <div v-if="isLoading" class="loader-container">
      <transition name="fade" mode="out-in">
        <div :key="currentIndex" class="content">
          <img :src="photos[currentIndex].url" :alt="photos[currentIndex].description" class="image" />
          <p class="description">{{ photos[currentIndex].description }}</p>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoading: true,
        photos: [
          { url: 'https://source.unsplash.com/random/400x300', description: 'Beautiful scenery' },
          { url: 'https://source.unsplash.com/random/400x301', description: 'City skyline at night' },
          { url: 'https://source.unsplash.com/random/400x302', description: 'Mountain peaks' },
          { url: 'https://source.unsplash.com/random/400x303', description: 'Serene beach' }
        ],
        currentIndex: 0
      };
    },
    mounted() {
      this.startSlideshow();
    },
    methods: {
      startSlideshow() {
        setInterval(() => {
          this.currentIndex = Math.floor(Math.random() * this.photos.length);
        }, 3000);
      }
    }
  };
  </script>
  
  <style scoped>
  .loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    text-align: center;
  }
  
  .image {
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .description {
    margin-top: 10px;
    font-size: 1.2em;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  