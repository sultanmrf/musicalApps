<template>
  <div>
    <USlideover side="top" v-model:open="isVisible">
      <template #header> Add to Playlist </template>
      <template #body>
        <div class="flex flex-col gap-2">
          <UButton variant="ghost" class="group text-white">
            <IconsTrash text="Delete" />
          </UButton>
        </div>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
const overlay = useOverlayManager();
const isVisible = computed({
  get: () => overlay.isOpen("addToPlaylistSideOver"),
  set: (val) => (val ? overlay.open("addToPlaylistSideOver") : overlay.close()),
});
</script>
