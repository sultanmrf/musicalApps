<script setup lang="ts">
const isOpenSearch = inject("isOpenSearch");
</script>

<template>
  <div dir="rtl">
    <USlideover
      v-model:open="isOpenSearch"
      :ui="{
        content: 'absolute',
      }"
      side="right"
      :overlay="true"
      :close="false"
    >
      <template #body>
        <section id="section-search">
          <div class="section-header flex justify-center items-center p-2">
             <ButtonsBtnOutline @click="isOpenSearch = false">
              <UIcon
                name="i-line-md:chevron-left"
                class="w-5 h-5 text-xl leading-[1.3rem]"
              />
            </ButtonsBtnOutline>

            <form class="w-[94%] pl-3" @submit.prevent="">
              <UInput
                icon="fal fa-magnifying-glass"
                color="gray"
                id="search"
                size="xl"
                :trailing="false"
                variant="outline"
                placeholder="جستجوی اهنگ ، آلبوم ، موزیک ..."
                required="true"
                class="flex text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
              </UInput>
            </form>
          </div>
          <div class="section-body"></div>
        </section>
      </template>
    </USlideover>
  </div>
</template>
