<template>
  <div class="flex flex-wrap justify-center gap-6 pb-48 relative pt-2">
    <UButton
      square
      variant="solid"
      class="group w-40 h-40 xs:p-8 bg-linear-to-b from-zinc-700 to-zinc-800 shadow-lg min-[450px]:w-48 min-[450px]:h-48 flex flex-col justify-center align-center relative rounded-lg before:absolute before:bg-zinc-800 hover:before:bg-primary hover:shadow-secondary transition-all before:w-20 before:h-2.5 before:top-[-9px] before:right-[14px] before:rounded-t-lg"
    >
      <div
        class="w-16 h-16 flex justify-center items-center shadow-inset-light mx-1 leading-[1.3rem] group-hover:font-black mb-3 rounded-full bg-zinc-700"
      >
        <IconsListMusic size="lg" icon-color="text-primary"/> 
      </div>
      <h2 class="text-white text-xl">My playlist</h2>
      <span class="text-gray-400">21 Music</span>
    </UButton>
    <UButton
      square
      variant="solid"
      class="group w-40 h-40 xs:p-8 bg-linear-to-b from-zinc-700 to-zinc-800 shadow-lg min-[450px]:w-48 min-[450px]:h-48 flex flex-col justify-center align-center relative rounded-lg before:absolute before:bg-zinc-800 hover:before:bg-primary hover:shadow-secondary transition-all before:w-20 before:h-2.5 before:top-[-9px] before:right-[14px] before:rounded-t-lg"
      to="/songs"
    >
      <div
        class="w-16 h-16 flex justify-center items-center shadow-inset-light mx-1 leading-[1.3rem] group-hover:font-black mb-3 rounded-full bg-zinc-700"
      >
        <IconsMusic size="lg" class="text-primary" />
      </div>
      <h2 class="text-white text-xl">My Music</h2>
      <span class="text-gray-400">{{ storeSongs.total }} Music</span>
    </UButton>
    <UButton
      square
      type="button"
      class="group w-40 h-40 xs:p-8 bg-linear-to-b from-zinc-700 to-zinc-800 shadow-lg min-[450px]:w-48 min-[450px]:h-48 flex flex-col justify-center align-center relative rounded-lg before:absolute before:bg-zinc-800 hover:before:bg-primary hover:shadow-secondary transition-all before:w-20 before:h-2.5 before:top-[-9px] before:right-[14px] before:rounded-t-lg"
      to="/songs"
    >
      <div
        class="w-16 h-16 flex justify-center items-center shadow-inset-light mx-1 leading-[1.3rem] group-hover:font-black mb-3 rounded-full bg-zinc-700"
      >
        <IconsMusicLibrary size="lg" class="text-primary" />
      </div>
      <h2 class="text-white text-xl">Albums</h2>
      <span class="text-gray-400">7 Music</span>
    </UButton>
    <UButton
      square
      variant="solid"
      class="group w-40 h-40 xs:p-8 bg-linear-to-b from-zinc-700 to-zinc-800 shadow-lg min-[450px]:w-48 min-[450px]:h-48 flex flex-col justify-center align-center relative rounded-lg before:absolute before:bg-zinc-800 hover:before:bg-primary hover:shadow-secondary transition-all before:w-20 before:h-2.5 before:top-[-9px] before:right-[14px] before:rounded-t-lg"
    >
      <div
        class="w-16 h-16 flex justify-center items-center shadow-inset-light mx-1 leading-[1.3rem] group-hover:font-black mb-3 rounded-full bg-zinc-700"
      >
        <IconsMusicNote size="lg" class="text-primary" />
      </div>
      <h2 class="text-white text-xl">Discover</h2>
      <span class="text-gray-400">100 Music</span>
    </UButton>

    <UNavigationMenu
      orientation="vertical"
      :items="items"
      class="rtl w-100 overflow-hidden"
    >
      <template #item="{ item }">
        <div class="text-lg py-3 flex items-center gap-2">
          <UIcon :name="item.icon" class="size-6" />
          <span
            class="before:absolute before:right-[2.6rem] before:border-zinc-700 before:left-0 before:bottom-0 before:border-b-1"
            >{{ item.label }}</span
          >
          <UIcon
            name="i-ic:baseline-keyboard-arrow-left"
            class="absolute end-0"
          />
        </div>
      </template>
    </UNavigationMenu>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
const storeSongs = inject("storeSongs");

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "Followers",
      icon: "i-mdi:account-check-outline",
      to: "/songs",
    },
    {
      label: "Favorites",
      icon: "i-akar-icons:heart",
      to: "/songs",
    },
    {
      label: "New Releases",
      icon: "i-fluent-emoji-high-contrast:musical-notes",
      to: "/songs",
    },
    {
      label: "Recently Played",
      icon: "i-gridicons:history",
      to: "/songs",
    },
  ],
]);
</script>

<style>
nav {
  .truncate {
    font-size: 1.1rem;
  }
}
</style>
