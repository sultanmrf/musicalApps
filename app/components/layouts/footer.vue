<template>
  <footer
    class="absolute bottom-0 border-t-2 border-neutral-500 dark:border-t-0 left-0 z-20 h-20 w-full p-4 shadow flex items-center 
    justify-between p-6 backdrop-blur-md bg-white dark:bg-[#1d1d1d]/40"
  >
    <ULink
      to="/"
      class="group flex-column w-10 h-10 justify-center text-center cursor-pointer"
    >
      <IconsProfile
        size="lg"
        :class="route.name == 'profile' ? 'text-primary' : 'dark:text-white text-dark'" class="hover:text-primary"
      />
    </ULink>

    <ULink
      :to="{ name: 'browser' }"
      class="group relative rounded-none flex-column w-10 h-10 justify-center text-center cursor-pointer"
    >
      <IconsMusicLibrary
        size="lg"
        :class="route.name == 'browser' ? 'text-primary' : 'dark:text-white text-dark'" class="hover:text-primary"
      />
    </ULink>

    <ULink
      :to="{ name: 'index' }"
      :class="
        route.name == 'index'
          ? 'from-secondary to-primary-500'
          : ''
      "
      class="group flex rounded-full w-14 h-14 bg-gradient-linear-dark 
      justify-center items-center hover:text-primary hover:shadow-3xl-orage hover:bg-primary-500 text-center cursor-pointer dark:shadow-3d shadow-3d-dark"
    >
      <IconsHome size="lg" :icon-color="route.name == 'index' ? 'text-primary' : 'dark:text-white text-dark'"/>
    </ULink>

    <ULink
      :to="{ name: 'songs' }"
      class="group flex-column w-10 h-10 justify-center text-center cursor-pointer"
    >
      <IconsMuscis
        size="lg"
        :class="route.name == 'songs' ? 'text-primary' : 'dark:text-white text-dark'"  class="hover:text-primary"
      />
    </ULink>

    <ULink
      to="/"
      class="group flex-column w-10 h-10 justify-center text-center cursor-pointer"
    >
      <IconsSearch
        size="lg"
        :class="route.name == 'search' ? 'text-primary' : 'dark:text-white text-dark'" class="hover:text-primary"
      />
    </ULink>
  </footer>
</template>

<script setup>
const route = useRoute();
</script>
