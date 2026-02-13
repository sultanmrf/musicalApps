<template>
  <div
    class="relative mt-4 w-full h-screen flex flex-col justify-baseline items-center rounded-3xl overflow-hidden text-white"
  >
    <div class="section-album relative">
      <div
        class="section-poster relative group overflow-hidden rounded-bl-[6rem]"
      >
        <NuxtImg
          :src="albumsIndex.posterAlbum"
          width="600"
          height="350"
          format="webp"
          quality="90"
          class="object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
        />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>

        <div
          class="flex flex-nowrap text-white text-sm gap-1 p-3 absolute bottom-3 right-3 bg-white/30 rounded-xl shadow-lg backdrop-blur-[0.3rem] border border-white/50"
        >
           <IconsListMusic size="sm" text="10" text-color="text-white"/> <span class="mx-2">|</span> <IconsComment size="sm">8</IconsComment> <span class="mx-2">|</span>  <IconsComment size="sm">4</IconsComment> 
        </div>
      </div>
      <UButton
        color="primary"
        variant="solid"
        class="!rounded-full w-14 h-14 absolute bottom-10 left-6 shadow-[0_8px_0_rgba(239,150,62,0.7),0_14px_25px_rgba(239,150,62,0.45)] transition-all duration-150 hover:-translate-y-1 active:translate-y-1 active:shadow-[0_4px_0_rgba(239,150,62,0.7),0_8px_15px_rgba(239,150,62,0.45)]"
      >
        <IconsPlay size="lg" />
      </UButton>
      <h1 class="mt-5 text-2xl text-center font-semibold">
        {{ title }}
      </h1>
    </div>

    <div class="section-songs-album w-full px-1 mt-2">
       <h2 class="text-xl font-semibold mb-3">Songs</h2>
        <card
        v-for="album in albums"
        :key="album._id"
      class="shadow p-2 shadow-zinc-100 dark:shadow-neutral-600 mb-3 relative overflow-hidden"
    >
      <div class="grid grid-cols-3 gap-3">
        <figure class="flex gap-3 col-span-2">
          <NuxtImg
            :src="album.poster.thumb"
            class="rounded-2xl ring-2 ring-gray-300 dark:ring-gray-500 shadow-3d dark:shadow-3d-dark"
            quality="80"
            width="70"
            height="70"
          />
          <figcaption class="flex flex-col justify-center items-baseline">
            <h4>{{album.fileName}}</h4>
            <span class="text-gray-400">{{album.artist}} </span>
          </figcaption>
        </figure>

        <div class="btn-actions col-span-1 flex justify-end items-center">
         <ButtonsBtnOutline
            v-if="album.status == 'waiting' || album.status == 'stop'"
            :key="album._id"
            @click="runPlaySong(album)"
            class="group ms-3 me-2"
          >
            <IconsPlay
              size="sm"
              class="text-primary leading-[1.3rem] group-hover:font-black"
            />
          </ButtonsBtnOutline>

          <ButtonsBtnOutline
            v-else
            color="primary"
            square
            variant="outline"
            class="group ms-3 me-2"
            @click="runPauseAudio(album._id)"
          >
            <IconsPause
              size="sm"
              class="text-primary leading-[1.3rem] group-hover:font-black"
            />
          </ButtonsBtnOutline>

          <album-wave-loading ref="wave" :show="album.status === 'play'" />
        </div>
      </div>
    </card>


    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAlbumsStore } from "~~/stores/albums";
import { useSettingStore } from "~~/stores/setting";
import { useAudioStore } from "~~/stores/audio";
import { useIndexStore } from "~~/stores/index";
import type { Song } from "~~/shared/types/song";


defineProps({
  title: {
    type: String,
    default: "New Love Song",
  },
  album: {
    type: String,
    default: "Album Name",
  },
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  },
});


const storeSetting = useSettingStore(),
  storeAudio = useAudioStore(),
  storeIndex = useIndexStore(),
  route = useRoute(),
  albumsIndex = useAlbumsStore(),
  albums = ref<Song[]>([]);

let wave = ref(null);
const runPlaySong = (album: Song): void => {
  debugger;
  storeAudio.playSong(album._id, album.path);
  useIndexStore().songSelected = album;
  storeSetting.setDataOpen(true);
};

const runPauseAudio = (albumId: string): void => {
  storeAudio.pauseSong(albumId);
};

onMounted(async () => {
  albums.value = await albumsIndex.fetchAlbumSongs(route.params.slug as string);
  debugger;
});
</script>
