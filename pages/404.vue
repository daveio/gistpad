<template>
  <div class="flex flex-col items-center justify-center py-16 space-y-8">
    <h1 style="font-size: 3rem; font-weight: bold; color: #cba6fc;" class="flex items-center">
      <span class="mr-3">🔍</span> 404
    </h1>

    <p style="font-size: 1.5rem; color: #bac2de; text-align: center;">
      Oops! The page you're looking for doesn't exist.
    </p>

    <NuxtLink to="/" style="display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; background-color: #89b4fa; color: #1e1e2e; border-radius: 0.5rem; font-weight: 600; text-decoration: none;"
              class="btn">
      <span class="mr-2">🏠</span> Go Home
    </NuxtLink>
  </div>
</template>

<script>
export default {
  head: {
    title: "Page Not Found - GistPad"
  }
}
</script>
