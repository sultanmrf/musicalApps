<template>
  <div
    class="relative w-full max-w-4xl h-[20rem] mx-auto overflow-hidden rounded-2xl shadow-lg"
  >
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(+${currentIndex * 100}%)` }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="w-full flex-shrink-0 h-auto flex items-center justify-center text-white text-2xl sm:text-4xl font-bold"
      >
        <img :src="slide.bg" alt="" />
      </div>
    </div>

    <!-- Indicators -->
    <div
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
    >
      <span
        v-for="(slide, index) in slides"
        :key="index"
        class="w-3 h-3 rounded-full cursor-pointer transition-colors"
        :class="{
          'bg-white': currentIndex === index,
          'bg-gray-400': currentIndex !== index,
        }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>

  <!-- Hot Music Section -->
  <div class="flex justify-between items-center mb-6 mt-6">
    <h2 class="text-2xl font-semibold">
      <span class="text-white">موریک های</span>
      <span class="text-gray-400"> گرم</span>
    </h2>
    <a href="#" class="text-sm  text-primary hover:underline">مشاهده همه</a>
  </div>

  <div class="flex gap-5 overflow-x-auto pb-2">
    <div
      v-for="(track, i) in hotTracks"
      :key="i"
      class="min-w-[90px] flex-shrink-0"
    >
      <UAvatar
        :src="track.cover"
        size="3xl"
        class="w-25 h-25"
        :ui="{ rounded: 'rounded-xl' }"

      />
      <p class="text-xs mt-2 truncate">{{ track.title }}</p>
      <p class="text-[10px] text-gray-400 truncate">{{ track.artist }}</p>
    </div>
  </div>

  <div class="flex justify-between items-center mb-6 mt-6">
    <h2 class="text-2xl font-semibold">
      <span class="text-white">آخرین</span>
      <span class="text-gray-400"> آلبوم ها</span>
    </h2>
    <a href="#" class="text-md text-primary hover:underline">مشاهده همه</a>
  </div>

  <div class="flex gap-5 overflow-x-auto pb-2">
    <AlbumCard
      v-for="(album, index) in albums"
      :key="index"
      :title="album.title"
      :artist="album.artist"
      :image="album.image"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const albums = [
  {
    title: "The Shawl",
    artist: "Kayeh Alaghi",
    image: "https://picsum.photos/640/640?random=7",
  },
  {
    title: "Che Hale Khobieh",
    artist: "Saman Jalili",
    image: "https://picsum.photos/640/640?random=5",
  },
  {
    title: "Bad Salighe",
    artist: "Sasy",
    image: "https://picsum.photos/640/640?random=1",
  },
  {
    title: "Bad Salighe",
    artist: "Sasy",
    image: "https://picsum.photos/640/640?random=1",
  },
];

const slides = [
  { bg: "https://picsum.photos/640/640?random=1" },
  { bg: "https://picsum.photos/640/640?random=1" },
  { bg: "https://picsum.photos/640/640?random=1" },
];


const currentIndex = ref(0);
let interval = null;

const startSlider = () => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slides.length;
  }, 2000);
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

onMounted(startSlider);
onBeforeUnmount(() => clearInterval(interval));

const hotTracks = [
  {
    title: "Chi Az In Behtar",
    artist: "Unknown",
    cover: "https://picsum.photos/640/640?random=1",
  },
  {
    title: "Hale Aronmesh",
    artist: "Beny Amin",
    cover: "https://picsum.photos/640/640?random=2",
  },
  {
    title: "Bego Kojayi",
    artist: "Sogand",
    cover: "https://picsum.photos/640/640?random=4",
  },
  {
    title: "Bego Kojayi",
    artist: "Sogand",
    cover: "https://picsum.photos/640/640?random=4",
  },
  {
    title: "Bego Kojayi",
    artist: "Sogand",
    cover: "https://picsum.photos/640/640?random=4",
  },
  {
    title: "Bego Kojayi",
    artist: "Sogand",
    cover: "https://picsum.photos/640/640?random=4",
  },
  {
    title: "Bego Kojayi",
    artist: "Sogand",
    cover: "https://picsum.photos/640/640?random=5",
  },
];
</script>
