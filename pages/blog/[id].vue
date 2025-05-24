<template>
  <div class="space-y-8">
    <article v-if="post" class="space-y-8">
      <NuxtLink to="/" style="display: inline-flex; align-items: center; color: #89b4fa; text-decoration: none;"
                class="btn">
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
              style="border: 2px solid #45475a;"
            />
          </div>

          <!-- Title and meta section -->
          <div class="flex-1">
            <h1 style="font-size: 2.5rem; font-weight: bold; color: #cba6fc; border-bottom: 3px solid #313244; padding-bottom: 0.5rem;">
              {{ post.title }}
            </h1>

            <p v-if="post.metadata?.formattedDate" style="color: #a6adc8; margin-top: 1rem;" class="flex items-center">
              <span class="mr-2">📅</span> {{ post.metadata.formattedDate }}
            </p>

            <div v-if="post.metadata?.tags && post.metadata.tags.length > 0" class="flex flex-wrap gap-2 mt-4">
              <NuxtLink
                v-for="tag in post.metadata.tags"
                :key="tag"
                :to="`/?tag=${tag}`"
                style="padding: 0.25rem 0.5rem; font-size: 0.75rem; border-radius: 9999px; background-color: #45475a; color: #89b4fa; text-decoration: none;"
                class="tag"
              >
                {{ tag }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </header>

      <div class="blog-content prose prose-invert max-w-none" v-html="renderedContent"></div>
    </article>

    <div v-else style="padding: 1.5rem; background-color: #313244; border-radius: 0.5rem; border: 1px solid #f38ba8; text-align: center;">
      <p style="color: #f38ba8;" class="flex items-center justify-center">
        <span class="mr-2">❌</span> Blog post not found
      </p>
      <NuxtLink to="/" style="display: inline-flex; align-items: center; margin-top: 1rem; color: #89b4fa; text-decoration: none;"
                class="btn">
        <span class="mr-1">←</span> Back to home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { Post } from "~/types"

// Define props from server data
// biome-ignore lint/correctness/noUnusedVariables: renderedContent used in template
const { post, renderedContent } = defineProps<{
  post: Post | null
  renderedContent: string
}>()

// Generate image URL with placecats.com fallback
// biome-ignore lint/correctness/noUnusedVariables: used in template
const imageUrl = computed(() => {
  if (post?.metadata?.image) {
    return post.metadata.image
  }
  // Use placecats.com for 128x128 placeholder
  return "https://placecats.com/128/128"
})

// Generate appropriate alt text
// biome-ignore lint/correctness/noUnusedVariables: used in template
const imageAlt = computed(() => {
  if (post?.metadata?.image) {
    return `Image for ${post.title}`
  }
  return `Placeholder cat image for ${post?.title || "blog post"}`
})
</script>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchGistById, parseGistContent } from '~/server/utils/github';
import { marked } from 'marked';
import hljs from 'highlight.js';

export default defineComponent({
  async asyncData({ params }) {
    try {
      const id = params.id as string;

      // Fetch the specific gist by ID during build time
      const gist = await fetchGistById(id);

      if (!gist) {
        return {
          post: null,
          renderedContent: '',
        };
      }

      // Parse the gist content
      const { metadata, content } = await parseGistContent(gist);

      // Create the post object
      const post = {
        ...gist,
        metadata,
        content,
        title: gist.description.replace(/^BLOG:\s*/, ''),
      };

      // Configure marked options for syntax highlighting
      marked.setOptions({
        highlight: function(code, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(code, { language: lang }).value;
            } catch (e) {
              console.error(e);
            }
          }
          return hljs.highlightAuto(code).value;
        },
        gfm: true,
        breaks: true,
      });

      // Render the markdown content to HTML
      const renderedContent = marked.parse(content);

      return {
        post,
        renderedContent,
      };
    } catch (error) {
      console.error('Error fetching post:', error);
      return {
        post: null,
        renderedContent: '',
      };
    }
  },

  head() {
    if (!this.post) {
      return {
        title: 'Post Not Found - GistPad',
      };
    }

    return {
      title: `${this.post.title} - GistPad`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.metadata?.excerpt || `Read ${this.post.title} on GistPad`,
        },
      ],
    };
  },
});
</script>
