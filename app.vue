<template>
  <div
    style="
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #1e1e2e;
      color: #cdd6f4;
    "
  >
    <AppHeader />
    <main style="flex-grow: 1" class="container mx-auto px-4 py-8 max-w-5xl">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app';

// Force dark theme
useHead({
  htmlAttrs: {
    style: 'background-color: #1e1e2e !important; color: #cdd6f4 !important;'
  },
  bodyAttrs: {
    style: 'background-color: #1e1e2e !important; color: #cdd6f4 !important;'
  }
});
</script>
