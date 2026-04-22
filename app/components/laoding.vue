<template>
  <div class="container backdrop-blur-md" v-if="isLoading">
    <div class="loader">
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
    </div>
  </div>
</template>

<script setup>
let { isLoading } = useLoading();
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  height: 100dvh;
  width: 100%;
  position: absolute;
  z-index: 100;
}

.loader {
  display: grid;
  grid-template-columns: repeat(2, 50px);
  grid-template-rows: repeat(2, 50px);
  gap: 30px;
  perspective: 1000px;
}

.cube {
  width: 60px;
  height: 60px;
  background-color: #ef963e;
  position: relative;
  border-radius: 5px;
  transform-style: preserve-3d;
  animation: rotate 1.8s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}

@keyframes rotate {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}

.cube:nth-child(1) {
  animation-delay: 0s;
}
.cube:nth-child(2) {
  animation-delay: 0.2s;
}
.cube:nth-child(3) {
  animation-delay: 0.4s;
}
.cube:nth-child(4) {
  animation-delay: 0.6s;
}
</style>
