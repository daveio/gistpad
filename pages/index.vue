<template>
  <div class="space-y-8">
    <section class="space-y-4">
      <h1 style="font-size: 2.5rem; font-weight: bold; color: #cba6fc; border-bottom: 3px solid #313244; padding-bottom: 0.5rem;" class="flex items-center">
        <span class="mr-3">✨</span> GistPad
      </h1>
      <p style="font-size: 1.25rem; color: #bac2de;">
        A static blog platform that fetches and displays blog posts from GitHub Gists.
        <span class="text-ctp-peach">Styled with Catppuccin Mocha 🎨</span>
      </p>
    </section>

    <TagFilter v-if="allTags.length > 0" :tags="allTags" :selected-tag="selectedTag" />

    <div v-if="filteredPosts.length > 0" class="space-y-6">
      <BlogCard v-for="post in filteredPosts" :key="post.id" :post="post" />
    </div>

    <div v-else style="padding: 1.5rem; background-color: #313244; border-radius: 0.5rem; border: 1px solid #45475a; text-align: center;">
      <p style="color: #bac2de;" class="flex items-center justify-center">
        <span class="mr-2">📭</span>
        {{ selectedTag ? `No posts found with tag "${selectedTag}"` : 'No blog posts found' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import type { Post } from "~/types"

// Get route to access query parameters
const route = useRoute()

// Define props from server data
const { posts, tags } = defineProps<{
  posts: Post[]
  tags: string[]
}>()

// Store all tags
const _allTags = ref(tags)

// Get selected tag from query parameter
const selectedTag = ref("")

// Initialize selectedTag from route query on mount
onMounted(() => {
  selectedTag.value = (route.query.tag as string) || ""
})

// Watch for route changes
watch(
  () => route.query.tag,
  (newTag) => {
    selectedTag.value = (newTag as string) || ""
  }
)

// Filter posts by tag if a tag filter is applied
const _filteredPosts = computed(() => {
  if (!selectedTag.value) return posts
  return posts.filter((post) => post.metadata?.tags?.includes(selectedTag.value))
})
</script>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchAllBlogPosts, extractAllTags } from '~/server/utils/github';

export default defineComponent({
  async asyncData() {
    try {
      // Fetch all blog posts during build time
      const posts = await fetchAllBlogPosts('daveio');

      // Extract all unique tags
      const tags = extractAllTags(posts);

      return {
        posts,
        tags,
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        posts: [],
        tags: [],
      };
    }
  }
});
</script>
