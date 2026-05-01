<template>
  <div
    @mousemove="handleMove"
    @mouseleave="resetTilt"
    :style="cardStyle"
    class="card w-full text-dark dark:text-white relative p-3 mb-4 overflow-hidden rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 transition-transform duration-200 ease-out will-change-transform shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
    :class="
      music.status === 'play'
        ? 'ring-1 ring-primary/50 shadow-[0_0_25px_rgba(255,140,0,0.4)]'
        : ''
    "
  >
    <div
      v-if="music.status === 'play'"
      class="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent animate-lightbar"
    />

    <div class="grid grid-cols-3 gap-3">
      <figure class="flex gap-3 col-span-2 items-center">
        <NuxtImg
          :src="music.poster.thumb"
          quality="80"
          width="70"
          height="70"
          class="rounded-2xl ring-2 ring-gray-300 dark:ring-gray-500 transition-transform duration-200"
          :style="innerStyle(30)"
        />

        <figcaption
          class="flex flex-col justify-center transition-transform duration-200"
          :style="innerStyle(20)"
        >
          <h4
            class="font-semibold w-[20rem] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {{ music.name }}
          </h4>
          <span class="text-gray-400 text-sm">
            {{ music.artist }}
          </span>
        </figcaption>
      </figure>

      <div
        class="btn-actions col-span-1 flex justify-end items-center transition-transform duration-200"
        :style="innerStyle(25)"
      >
        <ButtonsBtnOutline
          v-if="music.status === 'waiting' || music.status === 'stop'"
          @click="runPlaySong"
          class="group ms-3 me-2"
        >
          <IconsPlay
            size="sm"
            class="text-primary group-hover:scale-110 transition"
          />
        </ButtonsBtnOutline>

        <ButtonsBtnOutline
          v-else
          color="primary"
          square
          variant="outline"
          class="group ms-3 me-2"
          @click="runPauseAudio"
        >
          <IconsPause
            size="sm"
            class="text-primary group-hover:scale-110 transition"
          />
        </ButtonsBtnOutline>

        <ButtonsBtnOutline @click="openOptions" class="group ms-3 me-2">
          <iconsMenuList size="sm" class="text-primary" />
        </ButtonsBtnOutline>

        <SideOversSongOptionsSideOver />

        <SideOversAddToPlayListSideOver />

        <music-wave-loading :show="music.status === 'play'" />
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { useSongsStore } from "~~/stores/songs";
import { useAudioStore } from "~~/stores/audio";
import type { Song } from "~~/shared/types/song";
import { useUiStore } from "~~/stores/ui";

const ui = useUiStore();
const overlay = useOverlayManager();
const { music, listSongs } = defineProps<{ music: Song; listSongs: [Song] }>();
const storeAudio = useAudioStore();
const songsStore = useSongsStore();
const storeSetting = inject("storeSetting");
const tilt = ref({ x: 0, y: 0 });
const isHover = ref(false);

const handleMove = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement;
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  isHover.value = true;

  tilt.value = {
    x: (y / rect.height - 0.5) * 12,
    y: (x / rect.width - 0.5) * -12,
  };
};

const resetTilt = () => {
  isHover.value = false;
  tilt.value = { x: 0, y: 0 };
};

const cardStyle = computed(() =>
  isHover.value
    ? `transform: perspective(900px) rotateX(${tilt.value.x}deg) rotateY(${tilt.value.y}deg);`
    : `transform: perspective(900px) rotateX(0deg) rotateY(0deg);`,
);

const innerStyle = (depth: number) =>
  isHover.value
    ? `transform: translateZ(${depth}px);`
    : `transform: translateZ(0px);`;

const openOptions = () => {
  ui.setSong(music._id);
  overlay.open("songOptionsSideOver");
};

const runPlaySong = () => {
  storeAudio.setListPlay(listSongs);
  storeAudio.playSong(music._id, music.path);
  songsStore.songSelected = music;
  storeSetting?.setDataOpen(true);
};

const runPauseAudio = () => {
  storeAudio.pauseSong(music._id);
};
</script>
