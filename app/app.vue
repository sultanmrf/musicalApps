<template>
  <div
    class="app w-screen sm:w-[600px] max-w-2xl h-screen overflow-hidden bg-light dark:bg-dark relative"
  >
    <musical-laoding />
    <LayoutsHeader />
    <ProfileSidebar />
    <main class="mx-auto px-4 h-screen overflow-auto">
      <NuxtPage />
    </main>
    <LayoutsSearch />
    <LayoutsFooter />
    <MusicPlayer/>


  </div>
</template>

<script setup>
import { useIndexStore } from "../stores/index";

const isOpenAsideMenu = ref(false),
  isOpenSearch = ref(false),
  storeIndex = useIndexStore();

  defineShortcuts({
  o: () => isOpenSearch.value = !isOpenSearch.value
})

useIndexStore().fetchGetSongs();
provide("isOpenAsideMenu", isOpenAsideMenu);
provide("isOpenSearch", isOpenSearch);
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
