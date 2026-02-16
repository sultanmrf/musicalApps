<template>
    <button type="button"
        class="btn-primary relative w-10 h-10 flex justify-center items-center rounded-full p-1.5 bg-transparent dark:bg-white/10 
            shadow-3d dark:shadow-3d-dark overflow-hidden text-primary before:opacity-0 before:transition-all 
            before:duration-[0.5s] before:content before:absolute ease-in-out before:w-4 before:h-4
             before:bg-primary/50% before:rounded-full hover:before:opacity-100 hover:before:w-full hover:before:h-full cursor-pointer"
        @click="changeIconButtonToPlayOrpause" ref="tagButton">
        <font-awesome-icon :icon="`fal ${props.iconShow}`" class="text-primary" />
        <slot />
    </button>
</template>

<script setup>
const props = defineProps(['iconShow','iconDefault','iconActive']);

let btnActive = ref(true),
    tagButton = ref(null);

const emit = defineEmits(['update-icon']),
      changeIconButtonToPlayOrpause = () => {
        if(btnActive.value == true){
            tagButton.value.firstElementChild.classList.remove(props.iconDefault)
            tagButton.value.firstElementChild.classList.add(props.iconActive)
            btnActive.value = false;
        }else{
            tagButton.value.firstElementChild.classList.remove(props.iconActive)
            tagButton.value.firstElementChild.classList.add(props.iconDefault)
            btnActive.value = true;
        }
    };

</script>