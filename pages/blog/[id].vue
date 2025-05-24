<template>
  <div class="space-y-8">
    <div v-if="loading">
      <BlogPostSkeleton />
    </div>

    <div
      v-else-if="error"
      style="
        padding: 1.5rem;
        background-color: #313244;
        border-radius: 0.5rem;
        border: 1px solid #f38ba8;
        text-align: center;
      "
    >
      <p style="color: #f38ba8" class="flex items-center justify-center">
        <span class="mr-2">❌</span> {{ error }}
      </p>
      <NuxtLink
        to="/"
        style="
          display: inline-flex;
          align-items: center;
          margin-top: 1rem;
          color: #89b4fa;
          text-decoration: none;
        "
        class="btn"
      >
        <span class="mr-1">←</span> Back to home
      </NuxtLink>
    </div>

    <article v-else-if="post" class="space-y-8">
      <NuxtLink
        to="/"
        style="
          display: inline-flex;
          align-items: center;
          color: #89b4fa;
          text-decoration: none;
        "
        class="btn"
      >
        <span class="mr-1">←</span> Back to posts
      </NuxtLink>

      <header class="space-y-6">
        <div class="flex gap-6 items-start">
          <!-- Image section -->
          <div class="flex-shrink-0">
            <img
              :src="imageUrl"
              :alt="imageAlt"
              class="w-32 h-32 object-cover rounded-lg"
              style="border: 2px solid #45475a"
            />
          </div>

          <!-- Title and meta section -->
          <div class="flex-1">
            <h1
              style="
                font-size: 2.5rem;
                font-weight: bold;
                color: #cba6fc;
                border-bottom: 3px solid #313244;
                padding-bottom: 0.5rem;
              "
            >
              {{ title }}
            </h1>

            <p
              v-if="post && post.metadata && post.metadata.date"
              style="color: #a6adc8; margin-top: 1rem"
              class="flex items-center"
            >
              <span class="mr-2">📅</span> {{ formatDate(post.metadata.date) }}
            </p>

            <div
              v-if="
                post &&
                post.metadata &&
                post.metadata.tags &&
                post.metadata.tags.length > 0
              "
              class="flex flex-wrap gap-2 mt-4"
            >
              <NuxtLink
                v-for="tag in post.metadata.tags"
                :key="tag"
                :to="`/?tag=${tag}`"
                style="
                  padding: 0.25rem 0.5rem;
                  font-size: 0.75rem;
                  border-radius: 9999px;
                  background-color: #45475a;
                  color: #89b4fa;
                  text-decoration: none;
                "
                class="tag"
              >
                {{ tag }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </header>

      <div class="blog-content">
        <MarkdownRenderer v-if="post && post.content" :content="post.content" />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import { fetchGistById, parseGistContent } from '~/utils/github';
import { formatDate } from '~/utils/helpers';
import { onMounted } from 'vue';

const route = useRoute();
const id = route.params.id as string;

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
  content: string;
}

const post = ref<Post | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

// Extract title from the description (removing "BLOG: " prefix)
const title = computed(() => {
  if (!post.value) return '';
  return post.value.description.replace(/^BLOG:\s*/, '');
});

// Generate image URL with placecats.com fallback
const imageUrl = computed(() => {
  if (post.value?.metadata?.image) {
    return post.value.metadata.image;
  }
  // Use placecats.com for 128x128 placeholder
  return 'https://placecats.com/128/128';
});

// Generate appropriate alt text
const imageAlt = computed(() => {
  if (post.value?.metadata?.image) {
    return `Image for ${title.value}`;
  }
  return `Placeholder cat image for ${title.value}`;
});

const loadPost = async () => {
  loading.value = true; // Set loading to true at the beginning

  try {
    const gist = await fetchGistById(id);

    if (!gist) {
      error.value = 'Blog post not found';
      return;
    }

    const parsedContent = await parseGistContent(gist);
    post.value = {
      ...gist,
      ...parsedContent
    };
  } catch (err) {
    console.error('Error fetching gist:', err);
    error.value = 'Failed to load blog post. Please try again later.';
  } finally {
    loading.value = false; // Ensure loading is set to false in finally block
  }
};

onMounted(async () => {
  await loadPost();
});
</script>
