<template>
  <header>
    <nav class="menu flex items-center justify-between mx-auto px-4 py-5">
      <div class="flex">
        <ButtonsBtnOutline @click="isOpenAsideMenu = true">
          <UIcon
            name="i-fa7-solid:bars-staggered"
            class="w-5 h-5 text-xl leading-[1.3rem]"
          />
        </ButtonsBtnOutline>
        <ButtonsBtnOutline class="ms-3" @click="isDark = !isDark">
          <UIcon
            class="w-5 h-5 text-xl leading-[1.3rem]"
            :name="
              isDark ? 'i-bi:brightness-high-fill' : 'i-bi:brightness-high-fill'
            "
          />
        </ButtonsBtnOutline>
      </div>
      <ULink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img
          :src="`/images/${srcImgLogo}`"
          class="h-[3rem]"
          width="180"
          height="48"
          alt="موزیکال"
        />
      </ULink>
      <ButtonsBtnOutline @click="isOpenSearch = true">
        <UIcon
          name="i-streamline:magnifying-glass"
          class="w-5 h-5 text-xl leading-[1.3rem]"
        />
      </ButtonsBtnOutline>
    </nav>
  </header>
  {{ check }}
</template>

<script setup>
import { computed } from "vue";
const colorMode = useColorMode();
const isOpenAsideMenu = inject("isOpenAsideMenu"),
  isOpenSearch = inject("isOpenSearch");

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

let srcImgLogo = ref("logo-mode-dark.png"),
  check = computed(() => {
    if (colorMode.value === "dark") {
      srcImgLogo.value = "logo-mode-dark.png";
    } else {
      srcImgLogo.value = "logo-mode-bright.png";
    }
  });
</script>
