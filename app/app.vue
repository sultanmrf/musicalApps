<template>
  <div
    class="app w-screen sm:w-[600px] max-w-2xl h-screen overflow-hidden bg-white dark:bg-dark relative"
  >
    <MusicalLaoding />
    <Laoding />
    <LayoutsHeader />
    <ProfileSidebar />
    <main class="mx-auto px-4 h-screen overflow-auto pb-70">
      <NuxtPage />
      <FileUpload :class="marginBottomFileUpload" />
    </main>
    <LayoutsSearch />
    <LayoutsFooter />
    <MusicPlayer :isShowMusicPlayMini="isShowMusicPlayMini" />
  </div>
</template>

<script setup>
import { useSongsStore } from "../stores/songs";
import { useSettingStore } from "~~/stores/setting";

definePageMeta({
  middleware: "auth",
});

const storeSetting = useSettingStore();
const storeSongs = useSongsStore();
const isOpenAsideMenu = ref(false),
  isOpenSearch = ref(false),
  marginBottomFileUpload = ref(""),
  isShowMusicPlayMini = ref(true);

defineShortcuts({
  o: () => (isOpenSearch.value = !isOpenSearch.value),
});

useSongsStore().fetchSongs();

watchEffect(() => {
  if (useSongsStore().songSelected) {
    isShowMusicPlayMini.value = "";
    marginBottomFileUpload.value = "mb-20";
  } else {
    isShowMusicPlayMini.value = "hidden";
    marginBottomFileUpload.value = "";
  }
});

provide("isOpenAsideMenu", isOpenAsideMenu);
provide("isOpenSearch", isOpenSearch);
provide("storeSetting", storeSetting);
provide("storeSongs", storeSongs);

useHead({
  title: "موزیکال | وب اپلیکیشن برتر پخش موزیک | ",
  meta: [
    {
      name: "description",
      content:
        "موزیکال - اپلیکیشن برتر در دانلود و بخش بهترین موزیک های ایران و جهان می باشد که با امکانات زیاد خود، شما را محو در خودش می کند ",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
});
</script>
