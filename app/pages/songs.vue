<template>
  <TabLinks />

  <div class="flex items-center justify-between w-full my-2">
    <buttons-btn-default class="flex w-auto h-10 text-primary">
      <font-awesome-icon icon="fal fa-arrow-down-arrow-up me-2" />
      Sorting
    </buttons-btn-default>
    <span class="total-songs text-gray-600 dark:text-light">
      Songs ({{ storeIndex.mySongs.total }})
    </span>
  </div>

  <div v-if="storeIndex.mySongs.list.length > 0">
    <FileUpload/>
    <card
      v-for="(music, id) in storeIndex.mySongs.list"
      class="shadow shadow-zinc-500 dark:shadow-zinc-700 mb-3 relative overflow-hidden"
    >
      <div class="grid grid-cols-3 gap-3">
        <figure class="flex gap-3 col-span-2">
          <NuxtImg
            :src="music.poster"
            class="rounded-[1rem] ring-2 ring-gray-300 dark:ring-gray-500 shadow-3d dark:shadow-3d-dark"
            quality="80"
            width="70"
            height="70"
          />
          <figcaption class="flex flex-col justify-center items-baseline">
            <h4>{{ music.fileName }}</h4>
            <span> Hosin Ebliss </span>
          </figcaption>
        </figure>

        <div class="btn-actions col-span-1 flex justify-end items-center">
          <ButtonsBtnOutline
            v-if="music.status == 'waiting' || music.status == 'stop'"
            :key="music._id"
            @click="runPlaySong(music)"
            class="group"
          >
            <UIcon
              name="i-solar:play-broken"
              class="w-5 h-5 text-xl leading-[1.3rem] group-hover:font-black"
            />
          </ButtonsBtnOutline>

          <ButtonsBtnOutline
            v-else
            color="primary"
            square
            variant="outline"
            class="group ms-3"
            @click="runPauseAudio(music._id)"
          >
            <UIcon
              name="i-solar:pause-broken"
              class="w-5 h-5 text-xl leading-[1.3rem] group-hover:font-black"
            />
          </ButtonsBtnOutline>

          <UDropdown :items="listOptionAudio" :popper="{ arrow: true }">
            <UButton
              color="primary"
              square
              variant="ghost"
              class="group hover:bg-transparent"
              label="options"
            >
              <UIcon
                name="i-streamline:interface-setting-menu-vertical-navigation-vertical-three-circle-button-menu-dots"
                class="w-5 h-5 text-xl mx-1 leading-[1.3rem] group-hover:font-black"
              />
            </UButton>
          </UDropdown>

          <music-wave-loading ref="wave" :show="music.status === 'play'" />
        </div>
      </div>
    </card>
  </div>

</template>

<script setup lang="ts">
import { useSettingStore } from "../../stores/setting";
import { useAudioStore } from "../../stores/audio";
import { useIndexStore } from "../../stores/index";
import type { Song } from "../../shared/types/song";
import FileUpload from "~/components/fileUpload.vue";

const listOptionAudio = [
  [
    {
      label: "اضافه کردن به لیست بخش",
      icon: "i-mdi:account-check-outline mx-1 w-10 h-10 dark:text-white ",
      click: () => {
        console.log("Edit");
      },
    },
    {
      label: "افزودن به موارد دلخواه",
      icon: "i-mdi:account-check-outline mx-1 w-10 h-10 dark:text-white ",
      click: () => {
        console.log("Edit");
      },
    },
    {
      label: "ویرایش اطلاعات آهنگ",
      icon: "i-mdi:account-check-outline mx-1 w-10 h-10 dark:text-white ",
      click: () => {
        console.log("Edit");
      },
    },
    {
      label: "اشتراک گذاری",
      icon: "i-mdi:account-check-outline mx-1 w-10 h-10 dark:text-white ",
      click: () => {
        console.log("Edit");
      },
    },
    {
      label: "حذف",
      icon: "fal fa-remove mx-1 w-10 h-10 dark:text-white ",
      click: () => {
        console.log("Edit");
      },
    },
  ],
];

const storeSetting = useSettingStore(),
  storeAudio = useAudioStore(),
  storeIndex = useIndexStore();

let wave = ref(null);
const runPlaySong = (music: Song): void => {
  storeAudio.playSong(music._id, music.path);
  useIndexStore().songSelected = music;
  storeSetting.setDataOpen(true);
};

const runPauseAudio = (musicId: string): void => {
  storeAudio.pauseSong(musicId);
};
</script>
