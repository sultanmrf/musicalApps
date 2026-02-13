<template>
  <div class="flex flex-col items-center text-center">
    <div
      class="w-36 h-36 rounded-full overflow-hidden border-4 border-gray-700 relative"
    >
      <img :src="image" alt="Album Cover" class="w-full h-full object-cover" />
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-6 h-6 bg-black rounded-full"></div>
      </div>
    </div>
    <h3 class="mt-4 text-sm font-bold">{{ title }}</h3>
    <p class="text-xs text-gray-400">{{ artist }}</p>
  </div>
</template>

<script setup lang="ts">
interface PropsData {
  title: string
  artist: string
  image: string
}

const props = withDefaults(defineProps<PropsData>(), {
  title: 'Unknown',
  artist: 'Unknown Artist',
  image: '/placeholder.png'
})

</script>
