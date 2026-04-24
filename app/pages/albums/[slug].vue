<template>
  <div
    class="relative mt-4 w-full h-screen flex flex-col items-center rounded-3xl overflow-hidden text-white"
  >
    <div class="section-album relative w-full max-w-4xl">
      <div
        class="section-poster relative group overflow-hidden rounded-bl-[6rem] h-[330px]"
      >
        <NuxtImg
          :src="poster"
          format="webp"
          quality="90"
          class="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
        />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>

        <div
          class="flex flex-nowrap text-white text-sm gap-1 p-3 absolute bottom-3 right-3 bg-white/30 rounded-xl shadow-lg backdrop-blur-[0.3rem] border border-white/50"
        >
          {{ albumSongs.length }} Album
          <span class="mx-2">|</span>
          {{ albumSongs.length }} Songs
        </div>
      </div>

      <UButton
        color="primary"
        variant="solid"
        class="!rounded-full w-14 h-14 absolute bottom-10 left-6 shadow-[0_8px_0_rgba(239,150,62,0.7),0_14px_25px_rgba(239,150,62,0.45)] transition-all duration-150 hover:-translate-y-1 active:translate-y-1"
        @click="playAll"
      >
        <IconsPlay size="lg" />
      </UButton>

      <h1
        class="mt-5 text-2xl text-center text-dark dark:text-white font-semibold"
      >
        {{ albumName }}
      </h1>
    </div>

    <div class="section-songs-album w-full px-1 mt-2 max-w-4xl">
      <h2 class="text-xl font-semibold mb-3">Songs</h2>

      <CardsCardMusic
        v-for="song in albumSongs"
        :key="song._id"
        :music="song"
        :listSongs="albumSongs"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAudioStore } from "~~/stores/audio";

const route = useRoute();
const audioStore = useAudioStore();

const { albumDetails } = useAlbums();

const {
  albumSongs,
  poster,
  name: albumName,
} = await albumDetails(route.params.slug as string);

const playAll = () => {
  if (albumSongs.length > 0) {
    audioStore.playSong(albumSongs[0]._id, albumSongs[0].path);
  }
};
</script>
