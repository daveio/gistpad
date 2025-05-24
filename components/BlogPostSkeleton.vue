<template>
  <div class="space-y-8">
    <div class="h-6 w-32 bg-ctp-surface1 animate-pulse rounded"></div>

    <div class="space-y-4">
      <div class="h-12 w-3/4 bg-ctp-surface1 animate-pulse rounded"></div>
      <div class="h-4 w-48 bg-ctp-surface1 animate-pulse rounded"></div>
      <div class="flex gap-2">
        <div class="h-6 w-16 bg-ctp-surface1 animate-pulse rounded"></div>
        <div class="h-6 w-16 bg-ctp-surface1 animate-pulse rounded"></div>
        <div class="h-6 w-16 bg-ctp-surface1 animate-pulse rounded"></div>
      </div>
    </div>

    <div class="space-y-4">
      <div class="h-4 w-full bg-ctp-surface1 animate-pulse rounded"></div>
      <div class="h-4 w-full bg-ctp-surface1 animate-pulse rounded"></div>
      <div class="h-4 w-5/6 bg-ctp-surface1 animate-pulse rounded"></div>
      <div class="h-4 w-full bg-ctp-surface1 animate-pulse rounded"></div>
      <div class="h-4 w-4/5 bg-ctp-surface1 animate-pulse rounded"></div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
