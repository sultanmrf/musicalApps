<template>
  <div>
    <ButtonsBtnOutline
      color="primary"
      square
      class="group ms-3 me-2"
      @click="overlay.toggle('songOptionsSideOver')"
    >
      <iconsMenuList size="sm" class="text-primary" />
    </ButtonsBtnOutline>

    <USlideover
      side="bottom"
      v-model:open="isVisible"
    >
      <template #header>
        <NuxtImg :src="poster" width="70" height="70" class="rounded-2xl" />
        <div class="flex text-white flex-col">
          <span>{{ artist }}</span>
        </div>
      </template>

      <template #body>
        <div class="flex flex-col gap-2">
          <UButton
            variant="ghost"
            class="group text-white"
            @click="overlay.open('addToPlaylistSideOver')"
          >
            Add to playlist
          </UButton>

          <UButton variant="ghost" class="group text-white">
            <IconsTrash text="Delete" />
          </UButton>

          <UButton variant="ghost" class="group text-white">
            <IconsShare text="Share" />
          </UButton>
        </div>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
const { poster, artist } = defineProps<{ poster: string; artist: string }>();

const overlay = useOverlayManager();

const isVisible = computed({
  get: () => overlay.isOpen("songOptionsSideOver"),
  set: (val) => (val ? overlay.open("songOptionsSideOver") : overlay.close()),
});
</script>
