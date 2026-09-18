<template>
  <div dir="rtl">
    <USlideover
      v-model:open="isOpenSearch"
      :ui="{
        content: 'absolute',
      }"
      side="right"
      :overlay="true"
      :close="false"
    >
      <template #body>
        <section id="section-search">
          <div
            class="section-header flex flex-col justify-center items-center p-2"
          >
            <div class="flex flex-row-reverse mb-5 w-100">
              <ButtonsBtnOutline @click="isOpenSearch = false">
                <iconsAngleRight size="lg" />
              </ButtonsBtnOutline>

              <form class="w-[94%] pr-3 group">
                <UInput
                  v-model="searchQuery"
                  :ui="{
                    base: 'px-8 border-1 border-gray-500 rounded-lg hover:border-primary hover:bg-orange-400/10 focus:bg-orange-400/10 active:bg-orange-400/10 active:border-primary focus:border-primary',
                  }"
                  color="gray"
                  id="search"
                  size="xl"
                  :trailing="false"
                  variant="outline"
                  placeholder="Search what ? "
                  required="true"
                  class="flex text-xl text-gray-900 flex-row-reverse rounded-lg focus:ring-primary focus:border-primary dark:placeholder-gray-400 dark:text-white"
                >
                  <IconsSearch
                    size="sm"
                    class="absolute left-[7px] group-hover:text-primary group-focus:text-primary group-active:text-primary"
                  />
                </UInput>
              </form>
            </div>
            <div class="flex justify-between text-sm items-center w-100">
              <span>Resend Search</span>
              <ButtonsBtnDefault @click="clearSearch" class="text-primary">
                Clear All
              </ButtonsBtnDefault>
            </div>
          </div>

          <div class="section-body p-0 border-t border-muted pt-3">
            <div
              v-for="item in results"
              :key="item._id"
              class="py-2 flex items-center gap-2 pb-5"
            >
              <span v-if="item.type === 'song'" @click="runPlaySong(item)">
                <IconsMusic size="md" icon-color="text-primary" />
                {{ item.name }}
              </span>

              <span v-if="item.type === 'artist'">
                <nuxt-link :to="'/artists/' + item.name">
                  <IconsProfile size="md" icon-color="text-primary" />
                  {{ item.name }}
                </nuxt-link>
              </span>

              <span v-if="item.type === 'album'">
                <nuxt-link :to="'/albums/' + item.name">
                  <IconsBars size="md" icon-color="text-primary" />
                  {{ item.name }}
                </nuxt-link>
              </span>
            </div>
          </div>
        </section>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { useSongsStore } from "~~/stores/songs";
import { useArtistsStore } from "~~/stores/artists";
import { useAlbumsStore } from "~~/stores/albums";
import { useAudioStore } from "~~/stores/audio";
const storeAudio = useAudioStore();
const storeSetting = inject("storeSetting");
const isOpenSearch = inject("isOpenSearch");

const { searchQuery, search, clearSearch } = useSearch();
const songsStore = useSongsStore();
const artistsStore = useArtistsStore();
const albumsStore = useAlbumsStore();

const results = computed(() =>
  search(songsStore.list, artistsStore.list, albumsStore.list),
);

const runPlaySong = (item) => {
  const songResults = results.value.filter((r) => r.type === "song");
  storeAudio.setListPlay(songResults as any);
  storeAudio.playSong(item._id, item.path);
  isOpenSearch.value = false;
  storeSetting?.setDataOpen(true);
};


</script>
