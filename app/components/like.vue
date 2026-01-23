<script setup>
let isLike = ref(false);
const setLikeFile = (isLikeConfirm) => {
  if (isLikeConfirm == true) {
    isLike.value = true;
  } else {
    isLike.value = false;
  }
};
</script>

<template>
  <UButton
    v-if="isLike == true"
    square
    variant="ghost"
    class="group"
    @click="setLikeFile(false)"
  >
    <UIcon
      name="i-solar:heart-bold"
      class="w-10 h-10 text-3xl leading-[2.5rem] group-hover:font-normal text-red-500"
    />
  </UButton>
  <UButton
    v-else
    square
    variant="ghost"
    class="group"
    @click="setLikeFile(true)"
  >
    <UIcon
      name="i-solar:heart-broken"
      class="w-10 h-10 text-3xl leadin g-[2.5rem] text-gray-800 dark:text-gray-200 group-hover:font-normal"
    />
  </UButton>
</template>
