<template>
    <section
        class="section-loading animate__animated animate__delay-2s animate__zoomOut absolute flex  flex-col justify-center items-center w-full h-screen z-50 bg-dark"
        :class="showLoading === false ? 'hidden' : ''">
        <img src="/favicon.png" alt="logo" width="180" height="180" />
        <div class="loading ml-5 text-priamry">
            <span data-text="M">M</span>
            <span data-text="U">U</span>
            <span data-text="S">S</span>
            <span data-text="I">I</span>
            <span data-text="C">C</span>
            <span data-text="A">A</span>
            <span data-text="L">L</span>
        </div>
    </section>
</template>

<script setup>
import 'animate.css'
import { ref } from "vue"

let showLoading = ref(true);
setTimeout(() => {
    showLoading.value = false;
}, 2500);

</script>

<style lang="scss">
.loading {
    font-size: 6REM;
    font-weight: 600;
    letter-spacing: 16px;
    font-family: fantasy;

    span {
        position: relative;
        color: rgba(#000, .2);

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            content: attr(data-text);
            color: var(--primary-color);
            opacity: 0;
            transform: scale(1.5);
            animation: loading07 2.1s infinite;
        }

        @for $i from 1 through 6 {
            &:nth-child(#{$i+1})::after {
                animation-delay: #{$i*.1}s;
            }
        }
    }
}

@keyframes loading07 {

    0%,
    75%,
    100% {
        transform: scale(1.5);
        opacity: 0;
    }

    25%,
    50% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
