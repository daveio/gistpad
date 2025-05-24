<template>
  <div class="space-y-2">
    <h2 style="font-size: 1.125rem; font-weight: 600; color: #b4befe;" class="flex items-center">
      <span class="mr-2">🏷️</span> Filter by tag
    </h2>
    <div class="flex flex-wrap gap-2">
      <NuxtLink
        v-for="tag in tags"
        :key="tag"
        :to="selectedTag === tag ? '/' : `/?tag=${tag}`"
        style="padding: 0.5rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; cursor: pointer; text-decoration: none;"
        :style="selectedTag === tag
          ? 'background-color: #89b4fa; color: #1e1e2e;'
          : 'background-color: #45475a; color: #89b4fa;'"
        class="tag"
      >
        {{ tag }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tags: string[]
  selectedTag: string
}>()
</script>
