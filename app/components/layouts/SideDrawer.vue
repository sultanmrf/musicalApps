<template>
    <div class="flex">
      <!-- Sidebar -->
      <aside
        :class="[
          'w-64 h-screen p-4 flex flex-col justify-between transition-colors',
          isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        ]"
      >
        <div>
          <!-- Profile Section -->
          <div class="flex items-center mb-6">
            <img
              src="images/11.jpg"
              alt="Avatar"
              class="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <h2 class="font-bold text-lg">LanreB</h2>
              <p class="text-sm">70 Events</p>
            </div>
          </div>
  
          <!-- Menu -->
          <nav class="flex flex-col space-y-4">
            <NavItem icon="home" label="Home" />
            <NavItem icon="magnifying-glass" label="Explore" />
            <NavItem icon="calendar" label="My Events" />
            <NavItem icon="check-circle" label="Tasks" />
            <NavItem icon="user-plus" label="Invite Friends" />
            <NavItem icon="cog-6-tooth" label="Settings" />
            <NavItem icon="question-mark-circle" label="About" />
          </nav>
        </div>
  
        <!-- Sign Out -->
        <button class="flex items-center gap-2 text-red-500 mt-6">
          <UIcon name="arrow-left-on-rectangle" class="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </aside>
  
      <!-- Main Content (Placeholder) -->
      <main class="flex-1 p-6">
        <button @click="isDark = !isDark" class="mb-4 px-4 py-2 bg-gray-300 rounded">
          Toggle Theme
        </button>
        <p>This is your main content.</p>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const isDark = ref(false)
  </script>
  
  <!-- NavItem component -->
  <script>
 
  </script>
  