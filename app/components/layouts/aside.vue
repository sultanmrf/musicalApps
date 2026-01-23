<script setup lang="ts">
const route = useRoute();
const isOpenAsideMenu = inject("isOpenAsideMenu");

const links = [{
  label: 'مشکلات ',
  icon: 'i-heroicons-chart-bar',
  to: `${route.path.startsWith('/dev') ? '/dev' : ''}/components/vertical-navigation`
}, {
  label: 'محصولات',
  icon: 'i-heroicons-command-line',
  to: '/components/command-palette'
}, {
  label: 'نمونه ',
  icon: 'i-heroicons-light-bulb'
}, {
  label: 'راهنما',
  icon: 'i-heroicons-question-mark-circle'
}]

</script>

<template>
  <div>
    <USlideover v-model="isOpenAsideMenu" :ui="{ width: 'max-w-72 me-2 mt-2 mb-2 rounded-lg' }" side="left" :transition="false">
      <div class="p-2 h-42 mx-auto flex flex-col items-center">
       
       <UAvatar chip-color="primary" chip-text="" chip-position="top-right" size="3xl"
           src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
      
        <div class="card-avatar-text text-center p-2 mx-auto">
              <h1> محمد رضا سلطان</h1>
              <span class="text-xs text-slate-400"> آنلاین</span>
        </div>
        

      </div>
      <div class="slide-body">
        <UVerticalNavigation :links="links" />

      </div>
    </USlideover>
  </div>
</template>

<style lang="scss">
 .slide-header{
  background: url("public/images/pattern.svg") no-repeat;
  background-size: 100%;
 }


</style>