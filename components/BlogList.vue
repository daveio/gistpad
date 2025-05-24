<template>
  <div class="space-y-8">
    <TagFilter
      v-if="allTags.length > 0"
      :tags="allTags"
      :selected-tag="tagFilter"
    />

    <div v-if="loading" class="space-y-6">
      <div
        v-for="i in 3"
        :key="i"
        style="
          padding: 1.5rem;
          background-color: #313244;
          border-radius: 0.5rem;
          border: 1px solid #45475a;
        "
      >
        <div
          style="
            height: 2rem;
            width: 75%;
            background-color: #45475a;
            margin-bottom: 1rem;
            border-radius: 0.25rem;
          "
          class="animate-pulse"
        ></div>
        <div
          style="
            height: 1rem;
            width: 100%;
            background-color: #45475a;
            margin-bottom: 0.5rem;
            border-radius: 0.25rem;
          "
          class="animate-pulse"
        ></div>
        <div
          style="
            height: 1rem;
            width: 83%;
            background-color: #45475a;
            margin-bottom: 1rem;
            border-radius: 0.25rem;
          "
          class="animate-pulse"
        ></div>
        <div class="flex gap-2">
          <div
            style="
              height: 1.5rem;
              width: 4rem;
              background-color: #45475a;
              border-radius: 0.25rem;
            "
            class="animate-pulse"
          ></div>
          <div
            style="
              height: 1.5rem;
              width: 4rem;
              background-color: #45475a;
              border-radius: 0.25rem;
            "
            class="animate-pulse"
          ></div>
        </div>
      </div>
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
    </div>

    <div v-else-if="filteredPosts.length > 0" class="space-y-6">
      <BlogCard v-for="post in filteredPosts" :key="post.id" :post="post" />
    </div>

    <div
      v-else
      style="
        padding: 1.5rem;
        background-color: #313244;
        border-radius: 0.5rem;
        border: 1px solid #45475a;
        text-align: center;
      "
    >
      <p style="color: #bac2de" class="flex items-center justify-center">
        <span class="mr-2">📭</span>
        {{
          tagFilter
            ? `No posts found with tag "${tagFilter}"`
            : 'No blog posts found'
        }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchGists, parseGistMetadata } from '~/utils/github';
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import { onMounted } from 'vue';

const props = defineProps<{
  username: string;
}>();

const route = useRoute();

interface Post {
  id: string;
  description: string;
  metadata?: {
    date?: string;
    tags?: string[];
    excerpt?: string;
  };
}

const posts = ref<Post[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const allTags = ref<string[]>([]);
const tagFilter = ref<string>('');

if (route.query.tag) {
  tagFilter.value = route.query.tag as string;
}

// Filter posts by tag if a tag filter is applied
const filteredPosts = computed(() => {
  if (!tagFilter.value) return posts.value;
  return posts.value.filter((post) =>
    post.metadata?.tags?.includes(tagFilter.value)
  );
});

async function loadPosts() {
  try {
    loading.value = true;
    error.value = null;

    const gists = await fetchGists(props.username);

    // Filter gists that have descriptions starting with "BLOG: "
    const blogGists = gists.filter(
      (gist) => gist.description && gist.description.startsWith('BLOG: ')
    );

    if (blogGists.length === 0) {
      posts.value = [];
      allTags.value = [];
      return;
    }

    // Process each gist to extract metadata
    const processedGists = await Promise.all(
      blogGists.map(async (gist) => {
        try {
          const metadata = await parseGistMetadata(gist);
          return {
            ...gist,
            metadata
          };
        } catch (err) {
          console.warn(`Error processing gist ${gist.id}:`, err);
          return null;
        }
      })
    );

    // Filter out any null results from errors
    const validGists = processedGists.filter(Boolean) as Post[];

    // Extract all unique tags
    const tags = new Set<string>();
    validGists.forEach((gist) => {
      if (gist?.metadata?.tags) {
        gist.metadata.tags.forEach((tag: string) => tags.add(tag));
      }
    });

    allTags.value = Array.from(tags).sort();
    posts.value = validGists;
  } catch (err) {
    console.error('Error fetching gists:', err);
    error.value =
      'Failed to load blog posts. Please check your internet connection and try again.';
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await loadPosts();
});
</script>
