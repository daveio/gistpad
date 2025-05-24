<template>
  <div ref="contentRef" v-html="html"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

const props = defineProps<{
  content: string;
}>();

const html = ref('');
const contentRef = ref<HTMLElement | null>(null);

// Global state to track if dependencies are loaded
let dependenciesLoaded = false;
let markedInstance: any = null;
let DOMPurifyInstance: any = null;
let hljsInstance: any = null;

onMounted(async () => {
  try {
    // Only load dependencies once globally
    if (!dependenciesLoaded) {
      console.log('Loading markdown dependencies from CDN...');

      // Import dependencies with error handling
      const [markedModule, DOMPurifyModule, hljsModule] = await Promise.all([
        import('https://esm.sh/marked@12.0.0').catch(() => null),
        import('https://esm.sh/dompurify@3.0.8').catch(() => null),
        import('https://esm.sh/highlight.js@11.9.0').catch(() => null)
      ]);

      if (!markedModule || !DOMPurifyModule || !hljsModule) {
        throw new Error('Failed to load one or more dependencies from CDN');
      }

      markedInstance = markedModule.marked;
      DOMPurifyInstance = DOMPurifyModule.default || DOMPurifyModule;
      hljsInstance = hljsModule.default || hljsModule;

      // Load CSS for syntax highlighting only once
      if (!document.querySelector('link[href*="highlight.js"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href =
          'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github-dark.min.css';
        document.head.appendChild(link);
      }

      dependenciesLoaded = true;
      console.log('Markdown dependencies loaded successfully');
    }

    // Configure marked options
    markedInstance.setOptions({
      gfm: true,
      breaks: true,
      headerIds: true,
      mangle: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: true,
      highlight: (code: string, lang: string) => {
        if (
          lang &&
          hljsInstance.getLanguage &&
          hljsInstance.getLanguage(lang)
        ) {
          try {
            return hljsInstance.highlight(code, { language: lang }).value;
          } catch (e) {
            console.warn('Error highlighting code:', e);
          }
        }
        return hljsInstance.highlightAuto
          ? hljsInstance.highlightAuto(code).value
          : code;
      }
    });

    // Convert Markdown to HTML
    const rawHtml = markedInstance.parse(props.content);

    // Sanitize HTML to prevent XSS
    const cleanHtml = DOMPurifyInstance.sanitize(rawHtml);

    html.value = cleanHtml;

    // Apply syntax highlighting to code blocks after rendering
    await nextTick();
    if (contentRef.value && hljsInstance.highlightElement) {
      contentRef.value.querySelectorAll('pre code').forEach((block) => {
        try {
          hljsInstance.highlightElement(block as HTMLElement);
        } catch (e) {
          console.warn('Error highlighting element:', e);
        }
      });
    }
  } catch (error) {
    console.error('Error processing markdown:', error);
    // Fallback: display raw content with basic styling
    html.value = `<div style="color: #cdd6f4; background-color: #313244; padding: 1rem; border-radius: 0.5rem; white-space: pre-wrap; font-family: 'Victor Mono', monospace;">${props.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
  }
});
</script>

<style>
/* Add some styling for code blocks to enhance Victor Mono display */
pre code {
  font-family: 'Victor Mono', monospace !important;
  font-feature-settings:
    'liga' 1,
    'calt' 1;
  font-variant-ligatures: common_ligatures contextual;
  padding: 1rem !important;
  border-radius: 0.5rem !important;
}

/* Add a subtle glow effect to code blocks */
pre {
  position: relative;
  overflow: hidden;
}
</style>
