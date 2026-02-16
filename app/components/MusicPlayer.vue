<template>
  <!-- مدال پلیر بزرگ -->
  <div
    class="absolute inset-0 z-40 transition duration-1000 backdrop-blur-lg p-5"
    :class="
      storeSetting.isOpenDrawerShowSong
        ? 'pointer-events-auto opacity-100'
        : 'pointer-events-none opacity-0'
    "
  >
    <section class="section-show-music">
      <div class="section-header flex justify-between items-center">
        <ButtonsBtnOutline @click="storeSetting.setDataOpen(false)">
          <IconsAngleDown
            size="lg"
            class="btn-close text-primary leading-[1.3rem]"
          />
        </ButtonsBtnOutline>
        <UDropdown
          :items="items"
          :popper="{ arrow: true }"
          :ui="{ wrapper: 'rtl' }"
        >
          <ButtonsBtnOutline>
            <UIcon
              name="i-lucide:ellipsis-vertical"
              class="btn-info w-5 h-5 text-xl leading-[1.3rem]"
            />
          </ButtonsBtnOutline>
        </UDropdown>
      </div>

      <div
        class="section-body h-screen flex flex-col overflow-y-auto justify-evenly pb-16"
      >
        <div
          class="poster-music flex flex-col justify-center items-center my-2"
        >
          <EffectsMusicGramophone
            :poster="storeSongs.getMusicSelected?.poster.thumb"
            :runGramophone="
              storeSongs.songSelected?.status === 'play' ? true : false
            "
          />

          <h3
            class="poster-label text-gray-800 dark:text-white text-center text-xl my-4"
          >
            {{ storeSongs.songSelected?.fileName }}
            <span class="text-gray-400 block text-sm"></span>
          </h3>
        </div>
        <div class="setting-music">
          <div
            class="option-music flex justify-around flex-row-reverse items-center"
          >
            <UButton
              color="primary"
              square
              variant="ghost"
              class="group"
              v-if="storeAudio.volumeStatus"
              @click="storeAudio.volumeSongs(false)"
            >
              <IconsVolume
                size="lg"
                class="leading-[2.5rem] text-gray-800 dark:text-gray-200 group-hover:font-normal"
              />
            </UButton>

            <UButton
              color="primary"
              square
              variant="ghost"
              class="group"
              v-else
              @click="storeAudio.volumeSongs(true)"
            >
              <IconsVolumeClose
                size="lg"
                class="leading-[2.5rem] text-gray-800 dark:text-gray-200 group-hover:font-normal"
              />
            </UButton>

            <Like />

            <UButton color="primary" square variant="ghost" class="group">
              <IconsFolderPlus
                size="lg"
                class="leading-[2.5rem] text-gray-800 dark:text-gray-200 group-hover:font-normal"
              />
            </UButton>
          </div>
          <div
            class="progress-music relative flex justify-between flex-row-reverse my-10 mx-2 cursor-pointer"
          >
            <span
              class="time-current-music text-gray-300 absolute left-0 top-4"
              >{{ storeAudio.seekSliderSong.currentTimeText }}</span
            >
            <USlider
              color="primary"
              :min="0"
              :max="100"
              v-model="storeAudio.timeSong"
              :ui="{ wrapper: 'ltr' }"
            />
            <span class="time-end-music text-gray-300 absolute right-0 top-4">
              {{ storeAudio.seekSliderSong.endTimeText }}
            </span>
          </div>
          <div
            class="option-music flex justify-between flex-row-reverse items-center"
          >
            <UButton square variant="ghost" class="group">
              <IconsRepeat
                size="lg"
                class="0 text-gray-800 dark:text-gray-200 group-hover:font-normal"
              />
            </UButton>

            <UButton
              square
              variant="ghost"
              class="group"
              @click="storeAudio.nextSong"
            >
              <IconsNext size="lg" class="text-white group-hover:font-black" />
            </UButton>

            <UButton
              v-if="
                storeSongs.songSelected?.status == 'waiting' ||
                storeSongs.songSelected?.status == 'stop'
              "
              :ui="{ base: 'w-16 h-16' }"
              square
              variant="solid"
              class="group flex justify-center items-center rounded-full"
              @click="
                storeAudio.playSong(
                  storeSongs.songSelected?._id,
                  storeSongs.songSelected?.path,
                )
              "
            >
              <IconsPlay size="lg" class="text-white group-hover:font-black" />
            </UButton>

            <UButton
              v-else
              :ui="{ base: 'w-16 h-16' }"
              square
              variant="solid"
              class="group flex justify-center items-center rounded-full"
              @click="storeAudio.pauseSong(storeSongs.songSelected?._id)"
            >
              <IconsPause size="lg" class="text-white group-hover:font-black" />
            </UButton>

            <UButton
              square
              variant="ghost"
              class="group"
              @click="storeAudio.prevSong"
            >
              <IconsPrev size="lg" class="text-white group-hover:font-black" />
            </UButton>

            <UButton
              square
              variant="ghost"
              class="group"
              v-if="storeAudio.isShuffle === false"
              @click="storeAudio.activeAndUnactiveShuffleSongs(true)"
            >
              <IconsShuffle
                size="lg"
                class="text-gray-700 dark:text-gray-200 leading-[2.5rem] group-hover:font-normal"
              />
            </UButton>

            <UButton
              square
              variant="ghost"
              class="group"
              v-else
              @click="storeAudio.activeAndUnactiveShuffleSongs(false)"
            >
              <IconsShuffle
                size="lg"
                class="leading-[2.5rem] text-primary-700 dark:text-primary-400 group-hover:font-normal"
              />
            </UButton>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- مینی پلیر پایین صفحه -->
  <UCard
    v-if="
      storeSetting.isOpenDrawerShowSong == false && storeAudio.idSongCurrentPlay
    "
    :ui="{
      root: 'absolute transition-all duration-1000 w-full bottom-20 left-0 bg-transparent dark:bg-transparent backdrop-blur-sm',
      body: 'sm:p-4',
    }"
    :class="props.isShowMusicPlayMini"
  >
    <div class="grid grid-cols-3 gap-3">
      <figure
        class="cursor-pointer flex gap-3 col-span-2"
        @click="storeSetting.isOpenDrawerShowSong = true"
      >
        <NuxtImg
          :src="storeSongs.getMusicSelected?.poster.thumb"
          class="rounded-lg ring-2 ring-gray-300 dark:ring-gray-500 shadow-3d dark:shadow-3d-dark"
          quality="80"
          width="50"
          height="50"
          ref="cardImg"
        />
        <figcaption
          class="flex flex-col justify-center items-baseline text-dark dark:text-white"
        >
          <h4>{{ storeSongs.getMusicSelected?.fileName }}</h4>
          <span></span>
        </figcaption>
      </figure>

      <div class="btn-actions col-span-1 gap-2 flex justify-end items-center">
        <UButton
          v-if="
            storeSongs.getMusicSelected?.status == 'waiting' ||
            storeSongs.getMusicSelected?.status == 'stop'
          "
          color="primary"
          square
          variant="ghost"
          class="group"
          @click="
            storeAudio.playSong(
              storeSongs.songSelected?._id,
              storeSongs.songSelected?.path,
            )
          "
        >
          <IconsPlay
            size="sm"
            class="text-primary leading-[1.3rem] group-hover:font-black"
          />
        </UButton>

        <UButton
          v-else
          color="primary"
          square
          variant="ghost"
          class="group"
          @click="storeAudio.pauseSong(storeSongs.songSelected?._id)"
        >
          <IconsPause
            size="sm"
            class="text-primary leading-[1.3rem] group-hover:font-black"
          />
        </UButton>
        <UButton
          color="primary"
          square
          variant="ghost"
          class="group"
          @click="storeAudio.nextSong"
        >
          <IconsNext
            size="sm"
            class="text-primary leading-[1.3rem] group-hover:font-black"
          />
        </UButton>

        <UButton
          color="primary"
          square
          variant="ghost"
          class="group"
          @click="closeMusicPlayer()"
        >
          <IconsXmark
            size="md"
            class="text-primary leading-[1.3rem] group-hover:font-black"
          />
        </UButton>
      </div>
    </div>
  </UCard>
</template>


<script setup>
import { useSettingStore } from "../../stores/setting";
import { useAudioStore } from "../../stores/audio";
import { useSongsStore } from "~~/stores/songs";

const storeSetting = useSettingStore(),
  storeSongs = useSongsStore(),
  storeAudio = useAudioStore(),
  props = defineProps(["isShowMusicPlayMini"]);

const closeMusicPlayer = () => {
  storeAudio.pauseSong(storeSongs.songSelected?._id)
  storeAudio.closeMusic();
};

const items = [
  [
    {
      label: "Profile",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
  ],
];
</script>