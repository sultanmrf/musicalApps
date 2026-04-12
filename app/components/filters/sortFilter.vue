<template>
  <USlideover side="bottom">
    <buttons-btn-default class="flex w-auto h-10 text-white">
      {{ sortingData ? labels[sortingData] : "Sorting" }}
      <IconsSorting size="sm" iconColor="text-white" />
    </buttons-btn-default>

    <template #header>
      Sorting
    </template>

    <template #body>
      <div
        v-for="item in sortOptions[type]"
        :key="item"
        class="input-radio-group flex items-center justify-between mb-3"
      >
        <label :for="item">
          {{ labels[item] }}
        </label>

        <input
          type="radio"
          name="sort"
          :id="item"
          :value="item"
          v-model="sortingData"
          @change="sorting(item,type)"
        />
      </div>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
import type { SortType } from '~~/shared/types/sort'
const props = defineProps({
  type: {
    type: String,
    default: "songs"
  }
})

const { sorting } = useFilter();

const sortingData = ref<SortType | "">("");

const sortOptions: Record<string, SortType[]> = {
  songs: ["Ascending", "Descending", "DateAdd", "DateEdit"],
  artists: ["Ascending", "Descending"],
  albums: ["Ascending", "Descending"]
}

const labels: Record<SortType,string> = {
  Ascending: "Ascending",
  Descending: "Descending",
  DateAdd: "Date Add",
  DateEdit: "Date Edit"
}
</script>