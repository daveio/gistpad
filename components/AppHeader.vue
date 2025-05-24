<template>
  <header style="background-color: #181825; padding: 1rem 0; border-bottom: 1px solid #313244;">
    <div class="container mx-auto px-4 flex justify-between items-center max-w-5xl">
      <NuxtLink to="/" style="font-size: 1.5rem; font-weight: bold; color: #b4befe; text-decoration: none;"
                class="hover:text-ctp-mauve transition-colors flex items-center">
        <span class="mr-2">✨</span> GistPad
      </NuxtLink>
      <nav>
        <ul class="flex space-x-6">
          <li>
            <NuxtLink to="/" style="color: #bac2de; text-decoration: none;"
                      class="hover:text-ctp-text transition-colors flex items-center">
              <span class="mr-1">🏠</span> Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/?tag=all" style="color: #bac2de; text-decoration: none;"
                      class="hover:text-ctp-text transition-colors flex items-center">
              <span class="mr-1">🏷️</span> Tags
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
