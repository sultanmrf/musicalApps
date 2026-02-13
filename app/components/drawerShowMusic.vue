<script setup>
import { useSettingStore } from "../stores/setting";
import { useAudioStore } from "../stores/audio";
import { useIndexStore } from "../stores/index";

const storeSetting = useSettingStore(),
  storeIndex = useIndexStore(),
  storeAudio = useAudioStore(),
  slideoverComputed = computed({
    get: () => storeSetting.isOpenDrawerShowSong,
    set: (val) => storeSetting.setDataOpen(val),
  });

let baseSliderOverMusic = ref("h-full");
let baseCardDetailsMusic = ref("hidden");

const openFullDrawerShowMusic = (statusShow) => {
  baseSliderOverMusic.value = statusShow
    ? ["h-full"]
    : ["h-25", "!inset-x-0", "!bottom-22"];
  baseCardDetailsMusic.value = statusShow ? "hidden" : "";
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

<template>
  <USlideover
    v-model:open="slideoverComputed"
    side="bottom"
    :ui="{
      content: 'absolute  bg-elevated/75',
      body: '!max-w-2xl border-0 rtl transition-all duration-1000 backdrop-blur-lg items-end',
      translate: {
        base: 'translate-y-0',
        right: 'translate-y-full rtl:-translate-y-full',
      },
    }"
    :overlay="false"
    :close="false"
    :class="baseSliderOverMusic"
  >
    <template #body>
      <section
        class="section-show-music"
        :class="baseCardDetailsMusic == 'hidden' ? 'visible' : 'invisible'"
      >
        <div class="section-header flex justify-between items-center">
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

          <ButtonsBtnOutline @click="openFullDrawerShowMusic(false)">
            <UIcon
              name="i-pepicons-pop:angle-down"
              class="btn-close w-5 h-5 text-xl leading-[1.3rem]"
            />
          </ButtonsBtnOutline>
        </div>
        <div
          class="section-body h-screen flex flex-col overflow-y-auto justify-evenly"
        >
          <div
            class="poster-music flex flex-col justify-center items-center my-2"
          >
            <EffectsMusicGramophone
              :poster="storeIndex.getMusicSelected.poster"
              :runGramophone="
                storeIndex.songSelected.status === 'play' ? true : false
              "
            />
            <h3
              class="poster-label text-gray-800 dark:text-white text-center text-xl my-4"
            >
              {{ storeIndex.songSelected.fileName }}
              <span class="text-gray-400 block text-sm"></span>
            </h3>
          </div>
          <div class="setting-music">
            <div class="option-music flex justify-around items-center">
              <UButton
                color="primary"
                square
                variant="ghost"
                class="group"
                v-if="storeAudio.volumeStatus"
              >
                <UIcon
                  name="i-solar:volume-loud-broken"
                  class="w-10 h-10 text-3xl leading-[2.5rem] text-gray-800 dark:text-gray-200 group-hover:font-normal"
                  @click="storeAudio.volumeSongs(false)"
                />
              </UButton>

              <UButton
                color="primary"
                square
                variant="ghost"
                class="group"
                v-else
              >
                <UIcon
                  name="i-solar:volume-cross-outline"
                  class="w-10 h-10 text-3xl leading-[2.5rem] text-gray-800 dark:text-gray-200 group-hover:font-normal"
                  @click="storeAudio.volumeSongs(true)"
                />
              </UButton>

              <Like />

              <UButton
                color="primary"
                square
                variant="ghost"
                class="group"
                @click=""
              >
                <UIcon
                  name="i-bi:folder-plus"
                  class="w-10 h-10 text-2xl leading-[2.5rem] text-gray-800 dark:text-gray-200 group-hover:font-normal"
                />
              </UButton>
            </div>
            <div
              class="progress-music relative flex justify-between my-10 mx-2"
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
            <div class="option-music flex justify-between items-center">
              <UButton square variant="ghost" class="group">
                <UIcon
                  name="i-hugeicons:repeat"
                  class="w-10 h-10 text-3xl leading-[2.5rem] rotate-180 text-gray-800 dark:text-gray-200 group-hover:font-normal"
                />
              </UButton>

              <UButton
                square
                variant="ghost"
                class="group"
                @click="storeAudio.nextSong"
              >
                <UIcon
                  name="i-gravity-ui:forward-step"
                  class="w-10 h-10 text-3xl leading-[2.5rem] text-gray-800 dark:text-gray-200 group-hover:font-normal"
                />
              </UButton>

              <UButton
                v-if="
                  storeIndex.songSelected.status == 'waiting' ||
                  storeIndex.songSelected.status == 'stop'
                "
                :ui="{ base: 'w-16 h-16' }"
                square
                variant="solid"
                class="group flex justify-center items-center rounded-full"
                @click="
                  storeAudio.playSong(
                    storeIndex.songSelected._id,
                    storeIndex.songSelected.path,
                  )
                "
              >
                <IconsPlay
                  size="md"
                  class="text-white group-hover:font-black"
                />
              </UButton>

              <UButton
                v-else
                :ui="{ base: 'w-16 h-16' }"
                square
                variant="solid"
                class="group flex justify-center items-center rounded-full"
                @click="storeAudio.pauseSong(storeIndex.songSelected._id)"
              >
                <IconsPause
                  size="sm"
                  class="text-white group-hover:font-black"
                />
              </UButton>

              <UButton
                square
                variant="ghost"
                class="group"
                @click="storeAudio.prevSong"
              >
                <IconsNext
                  size="sm"
                  class="text-white group-hover:font-black"
                />
              </UButton>

              <UButton
                square
                variant="ghost"
                class="group"
                v-if="storeAudio.isShuffle === false"
                @click="storeAudio.activeAndUnactiveShuffleSongs(true)"
              >
                <UIcon
                  name="i-zondicons:shuffle"
                  class="w-10 h-10 text-3xl leading-[2.5rem] text-gray-700 dark:text-gray-200 group-hover:font-normal"
                />
              </UButton>

              <UButton
                square
                variant="ghost"
                class="group"
                v-else
                @click="storeAudio.activeAndUnactiveShuffleSongs(false)"
              >
                <UIcon
                  name="i-zondicons:shuffle"
                  class="w-10 h-10 text-3xl leading-[2.5rem] text-orange-700 dark:text-orange-200 group-hover:font-normal"
                />
              </UButton>
            </div>
          </div>
        </div>
      </section>
    </template>
  </USlideover>

  <UCard
    v-if="storeIndex.getMusicSelected.poster"
    @click="openFullDrawerShowMusic(true)"
    :ui="{
      root: 'absolute transition-all duration-1000 w-full bottom-20 left-0 bg-transparent dark:bg-transparent backdrop-blur-sm',
      body: 'sm:p-4',
    }"
  >
    <div class="grid grid-cols-3 gap-3">
      <div class="btn-actions col-span-1 gap-2 flex items-center">
        <UButton
          color="primary"
          square
          variant="ghost"
          class="group"
          @click="storeAudio.nextSong"
        >
          <UIcon
            name="i-gravity-ui:forward-step"
            class="w-5 h-5 text-xl mx-1 leading-[1.3rem] group-hover:font-black"
          />
        </UButton>

        <UButton
          v-if="
            storeIndex.getMusicSelected.status == 'waiting' ||
            storeIndex.getMusicSelected.status == 'stop'
          "
          color="primary"
          square
          variant="ghost"
          class="group"
          @click="
            storeAudio.playSong(
              storeIndex.songSelected._id,
              storeIndex.songSelected.path,
            )
          "
        >
          <UIcon
            name="i-solar:play-broken"
            class="w-5 h-5 text-xl leading-[1.3rem] group-hover:font-black"
          />
        </UButton>

        <UButton
          v-else
          color="primary"
          square
          variant="ghost"
          class="group"
          @click="storeAudio.pauseSong(storeIndex.songSelected._id)"
        >
          <UIcon
            name="i-solar:pause-broken"
            class="w-5 h-5 text-xl leading-[1.3rem] group-hover:font-black"
          />
        </UButton>
      </div>

      <figure
        class="cursor-pointer flex gap-3 col-span-2 flex-row-reverse"
        @click="openFullDrawerShowMusic(true)"
      >
        <NuxtImg
          :src="storeIndex.getMusicSelected.poster"
          class="rounded-lg ring-2 ring-gray-300 dark:ring-gray-500 shadow-3d dark:shadow-3d-dark"
          quality="80"
          width="50"
          height="50"
          ref="cardImg"
        />
        <figcaption
          class="flex flex-col justify-center items-baseline text-dark dark:text-white"
        >
          <h4>{{ storeIndex.getMusicSelected.fileName }}</h4>
          <span></span>
        </figcaption>
      </figure>
    </div>
  </UCard>
</template>
