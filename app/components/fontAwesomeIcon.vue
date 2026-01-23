<template>
    <i :class="prop.icon" class="text-xl leading-none">
        <slot/>
    </i>

</template>

<script setup>
const prop = defineProps(['icon']);
</script>