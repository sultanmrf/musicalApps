<template>
  <section
    class="section-tab-link text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
  >
    <ul class="flex flex-nowrap overflow-auto -mb-px">
      <li class="me-2">
        <NuxtLink
          to="/songs"
          class="inline-block border-b-2 rounded-t-lg hover:text-primary hover:border-primary text-base p-3 text-nowrap"
          :class="checkRoutePage('songs')"
        >
          Songs
        </NuxtLink>
      </li>
      <li class="me-2">
        <NuxtLink
          to="/artists"
          class="inline-block border-b-2 rounded-t-lg hover:text-primary hover:border-primary text-base p-3 text-nowrap"
          :class="checkRoutePage('artists')"
        >
          Artists
        </NuxtLink>
      </li>
      <li class="me-2">
        <NuxtLink
          to="/albums"
          class="inline-block border-b-2 rounded-t-lg hover:text-primary hover:border-primary text-base p-3 text-nowrap"
          :class="checkRoutePage('albums')"
        >
          Albums
        </NuxtLink>
      </li>
      <li class="me-2">
        <NuxtLink
          to="/folders"
          class="inline-block border-b-2 rounded-t-lg hover:text-primary hover:border-primary text-base p-3 text-nowrap"
          :class="checkRoutePage('folders')"
        >
          Folders
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/suggestions"
          class="inline-block border-b-2 rounded-t-lg hover:text-primary hover:border-primary text-base p-3 text-nowrap"
          :class="checkRoutePage('suggestions')"
        >
          Suggestions
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

let checkRoutePage = (namePage) => {
  if (route.name === namePage) {
    return "border-primary text-primary";
  } else {
    return "border-transparent";
  }
};
</script>
