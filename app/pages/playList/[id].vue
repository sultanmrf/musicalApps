<template>
  <div
    v-if="currentPlaylist"
    class="relative mt-4 w-full h-screen flex flex-col items-center rounded-3xl overflow-hidden text-white"
  >
    <div class="section-album relative w-full max-w-4xl">
      <div
        class="section-poster relative group overflow-hidden rounded-bl-[6rem]"
      >
        <NuxtImg
          :src="playlistCover"
          width="600"
          height="350"
          format="webp"
          quality="90"
          class="object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
        />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>
      </div>

      <UButton
        color="primary"
        variant="solid"
        class="!rounded-full w-14 h-14 absolute bottom-10 left-6 shadow-[0_8px_0_rgba(239,150,62,0.7),0_14px_25px_rgba(239,150,62,0.45)] transition-all duration-150 hover:-translate-y-1 active:translate-y-1"
      >
        <IconsPlay size="lg" />
      </UButton>

      <h1
        class="mt-5 text-2xl text-center text-dark dark:text-white font-semibold"
      >
        {{ currentPlaylist.name }}
      </h1>
    </div>

    <div class="section-songs-album w-full px-1 mt-2 max-w-4xl">
      <h2 class="text-xl font-semibold mb-3">Songs</h2>

      <CardsCardMusic
        v-for="song in currentPlaylist.songs"
        :key="song._id"
        :music="song"
        :listSongs="currentPlaylist.songs"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { getPlaylist, currentPlaylist } = usePlaylist();

await getPlaylist(route.params.id as string);

const playlistCover = computed(
  () => currentPlaylist.value?.cover || "/images/playList.png",
);
</script>