<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center">

    <div
      class="absolute inset-0 bg-black/60"
      @click="$emit('update:modelValue', false)"
    ></div>

    <div class="relative bg-white dark:bg-neutral-900 rounded-xl w-[420px] p-6 shadow-xl">

      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold">
          Create Playlist
        </h2>

        <button
          class="text-gray-400 hover:text-white"
          @click="$emit('update:modelValue', false)"
        >
          ✕
        </button>
      </div>

      <slot />

    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean
})

defineEmits(["update:modelValue"])
</script>
