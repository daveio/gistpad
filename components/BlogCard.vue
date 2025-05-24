<template>
  <div
    style="
      padding: 1rem 1.5rem 1.5rem 1.5rem;
      background-color: #313244;
      border-radius: 0.5rem;
      border: 1px solid #45475a;
    "
    class="card-hover"
  >
    <NuxtLink
      :to="`/blog/${post.id}`"
      class="block"
      style="text-decoration: none"
    >
      <div class="flex gap-4">
        <!-- Image section -->
        <div class="flex-shrink-0">
          <img
            :src="imageUrl"
            :alt="imageAlt"
            class="w-20 h-20 object-cover rounded-lg"
            style="border: 1px solid #45475a"
          />
        </div>

        <!-- Content section -->
        <div class="flex-1 space-y-3">
          <h2
            style="
              font-size: 1.5rem;
              font-weight: 600;
              color: #f5c2e7;
              border-bottom: 1px solid #45475a;
              padding-bottom: 0.5rem;
            "
          >
            {{ title }}
          </h2>

          <p
            v-if="date"
            style="font-size: 0.875rem; color: #a6adc8"
            class="flex items-center"
          >
            <span class="mr-1">📅</span> {{ formatDate(date) }}
          </p>

          <div v-if="excerpt" class="prose prose-sm prose-invert max-w-none">
            <p style="color: #bac2de" class="line-clamp-3">{{ excerpt }}</p>
          </div>

          <div v-if="tags && tags.length > 0" class="flex flex-wrap gap-2">
            <span
              v-for="tag in tags"
              :key="tag"
              style="
                padding: 0.25rem 0.5rem;
                font-size: 0.75rem;
                border-radius: 9999px;
                background-color: #45475a;
                color: #89b4fa;
              "
              class="tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/helpers';
import { computed } from 'vue';

interface PostMetadata {
  date?: string;
  tags?: string[];
  excerpt?: string;
  image?: string;
}

interface Post {
  id: string;
  description: string;
  metadata?: PostMetadata;
}

const props = defineProps<{
  post: Post;
}>();

// Extract title from the description (removing "BLOG: " prefix)
const title = computed(() => props.post.description.replace(/^BLOG:\s*/, ''));

// Extract metadata
const date = computed(() => props.post.metadata?.date);
const tags = computed(() => props.post.metadata?.tags);
const excerpt = computed(() => props.post.metadata?.excerpt);
const image = computed(() => props.post.metadata?.image);

// Generate image URL with placecats.com fallback
const imageUrl = computed(() => {
  if (image.value) {
    return image.value;
  }
  // Use placecats.com for 80x80 placeholder
  return 'https://placecats.com/80/80';
});

// Generate appropriate alt text
const imageAlt = computed(() => {
  if (image.value) {
    return `Image for ${title.value}`;
  }
  return `Placeholder cat image for ${title.value}`;
});
</script>
