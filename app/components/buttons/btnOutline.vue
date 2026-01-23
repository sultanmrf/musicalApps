<template>
    <UButton
        color="primary"
        square
        variant="outline"
        class="relative bg-transparent flex items-center justify-center dark:shadow-3d shadow-3d-dark 
          rounded-full w-10 h-10 before:opacity-0 before:transition-all before:duration-[0.5s] 
          before:content before:absolute ease-in-out before:w-4 before:h-4 before:bg-primary-500
           before:rounded-full hover:before:opacity-100 hover:before:w-full hover:before:h-full hover:dark:bg-transparent hover:bg-transparent">
        <slot/>
      </UButton>
</template>

<script setup>


</script>