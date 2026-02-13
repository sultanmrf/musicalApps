<template>
  <USlideover
    v-model:open="isOpenAsideMenu"
    :ui="{ content: 'absolute p-0' , body: 'sm:p-0'}"
    side="left"
    :overlay="true"
    :close="false"
    class="bg-gradient-to-b from-[#0b0b0b] to-[#141414] w-80 p-0"
  >
    <template #body>
      <aside class="h-full flex flex-col justify-between px-4 py-6 relative">

        <!-- Glow background -->
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,#1db95422,transparent_60%)] pointer-events-none"></div>

        <!-- Top -->
        <div class="relative z-10">
          <!-- Profile -->
          <div class="flex items-center gap-4 mb-12">
            <div class="relative">
              <img
                src="/images/reza.png"
                class="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-500/40"
              />
              <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-[#0b0b0b]"></span>
            </div>

            <div>
              <h3 class="text-white font-semibold leading-tight">
                {{ useAuth.user?.username }}
              </h3>
              <p class="text-xs text-gray-400">70 Events</p>
            </div>
          </div>

          <!-- Navigation -->
          <nav class="space-y-2">
            <SidebarItem to="/" label="Home" icon="i-material-symbols:home-rounded" @click="isOpenAsideMenu = false"/>
            <SidebarItem to="/explore" label="Explore" icon="i-material-symbols:explore-rounded" @click="isOpenAsideMenu = false"/>
            <SidebarItem to="/events" label="My Events" icon="i-material-symbols:event-rounded" @click="isOpenAsideMenu = false"/>
            <SidebarItem to="/settings" label="Settings" icon="i-material-symbols:settings-rounded" @click="isOpenAsideMenu = false"/>
            <SidebarItem to="/auth" label="Login" icon="i-material-symbols:login-rounded" @click="isOpenAsideMenu = false"/>
          </nav>
        </div>

        <!-- Bottom -->
        <button
          class="relative z-10 flex items-center gap-3 text-red-500 hover:text-red-400 transition group"
        @click="useAuth.logout()">
          <UIcon
            name="i-streamline-pixel:interface-essential-signout-logout"
            class="w-5 h-5 group-hover:translate-x-1 transition-transform"
          />
          <span class="font-medium">Sign Out</span>
        </button>

      </aside>
    </template>
  </USlideover>
</template>


<script setup>
import SidebarItem from "./sidebarItem.vue";
import { useAuthStore } from "../../../stores/auth";
const isOpenAsideMenu = inject("isOpenAsideMenu");
const useAuth = useAuthStore();

</script>
