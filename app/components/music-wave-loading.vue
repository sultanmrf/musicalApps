<template>
    <div class="loading-wave" :class="prop.show == false ? '!hidden' : '' ">
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
    </div>
</template>

<script setup>
const prop = defineProps(['show']);

</script>

<style lang="scss">
.loading-wave {
    display: flex;
    position: absolute;
    left: 10.7rem;
    top: 4.7rem;

    .obj {
        width: 6px;
        height: 20px;
        background-color: var(--primary-light-color);
        margin: 0 3px;
        border-radius: 10px;
        animation: shrink 0.8s linear infinite;

        &:nth-child(2) {
            animation-delay: 0.1s;
        }

        &:nth-child(3) {
            animation-delay: 0.2s;
        }

        &:nth-child(4) {
            animation-delay: 0.3s;
        }

        &:nth-child(5) {
            animation-delay: 0.1s;
        }

        &:nth-child(6) {
            animation-delay: 0.2s;
        }

        &:nth-child(7) {
            animation-delay: 0.3s;
        }

        &:nth-child(8) {
            animation-delay: 0.1s;
        }

        &:nth-child(9) {
            animation-delay: 0.2s;
        }

        &:nth-child(10) {
            animation-delay: 0.3s;
        }

        &:nth-child(11) {
            animation-delay: 0.1s;
        }

        &:nth-child(12) {
            animation-delay: 0.2s;
        }

        &:nth-child(13) {
            animation-delay: 0.3s;
        }

        &:nth-child(14) {
            animation-delay: 0.1s;
        }

        &:nth-child(15) {
            animation-delay: 0.2s;
        }

        &:nth-child(16) {
            animation-delay: 0.3s;
        }

        &:nth-child(17) {
            animation-delay: 0.1s;
        }

        &:nth-child(18) {
            animation-delay: 0.2s;
        }

        &:nth-child(19) {
            animation-delay: 0.3s;
        }

        &:nth-child(20) {
            animation-delay: 0.1s;
        }



    }


}


@keyframes shrink {
    0% {
        transform: scaleY(0);
    }

    50% {
        transform: scaleY(1);
    }

    100% {
        transform: scaleY(0);
    }
}
</style>