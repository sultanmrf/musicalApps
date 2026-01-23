<template>
  <footer
    class="absolute bottom-0 left-0 z-20 h-20 w-full p-4 shadow flex items-center justify-between p-6 backdrop-blur-md bg-[#111]/40 rounded-t-lg"
  >
    <ULink
      to="/"
      class="group flex-column w-10 h-10 justify-center text-center cursor-pointer"
    >
      <UIcon
        name="i-tabler:user-hexagon"
        :class="route.name == 'profile' ? 'text-primary' : 'text-gray-500'"
        class="size-8 group-hover:text-primary"
      />
    </ULink>
    <ULink
      :to="{ name: 'browser' }"
      class="group relative flex-column w-10 h-10 justify-center text-center cursor-pointer"
    >
      <UIcon
        name="i-solar:music-library-2-broken"
        :class="route.name == 'browser' ? 'text-primary' : 'text-gray-500'"
        class="size-8 group-hover:text-primary"
      />
    </ULink>

    <ULink
      :to="{ name: 'index' }"
      :class="
        route.name == 'index'
          ? 'bg-linear-to-r from-secondary to-primary-500'
          : ''
      "
      class="group flex rounded-full w-14 h-14 justify-center items-center hover:text-primary hover:shadow-3xl-orage hover:bg-primary-500 text-center cursor-pointer dark:shadow-3d shadow-3d-dark"
    >
      <UIcon
        name="i-material-symbols-light:home-app-logo"
        class="text-white size-9"
      />
    </ULink>

    <ULink
      :to="{ name: 'songs' }"
      class="group flex-column w-10 h-10 justify-center text-center cursor-pointer"
    >
      <UIcon
        name="i-fluent:headphones-sound-wave-28-regular"
        :class="route.name == 'songs' ? 'text-primary' : 'text-gray-500'"
        class="size-8 group-hover:text-primary"
      />
    </ULink>
    <ULink
      to="/"
      class="group flex-column w-10 h-10 justify-center text-center cursor-pointer"
    >
      <UIcon
        name="i-lucide:search"
        :class="route.name == 'search' ? 'text-primary' : 'text-gray-500'"
        class="size-8 group-hover:text-primary"
      />
    </ULink>
  </footer>
</template>

<script setup>
const route = useRoute();
</script>
