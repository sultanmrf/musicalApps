<template>
  <NuxtLink
    :to="to"
    class="group flex items-center gap-3 pe-4 py-2.5 rounded-lg transition relative"
    :class="isActive
      ? 'bg-white/5 text-emerald-400'
      : 'text-gray-300 hover:text-white hover:bg-white/5'"
  >
    <!-- Active line -->
    <span
      v-if="isActive"
      class="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-emerald-500"
    ></span>

    <UIcon
      :name="icon"
      class="w-5 h-5 opacity-80 group-hover:opacity-100"
    />

    <span class="text-sm font-medium tracking-wide">
      {{ label }}
    </span>
  </NuxtLink>
</template>


<script setup>
import { useRoute } from "vue-router";

const props = defineProps({
  to: String,
  label: String,
  icon: String,
});

const route = useRoute();
const isActive = computed(() => route.path === props.to);
</script>
