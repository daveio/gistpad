<template>
  <div class="space-y-8">
    <section class="space-y-4">
      <h1
        style="
          font-size: 2.5rem;
          font-weight: bold;
          color: #cba6fc;
          border-bottom: 3px solid #313244;
          padding-bottom: 0.5rem;
        "
        class="flex items-center"
      >
        <span class="mr-3">✨</span> GistPad
      </h1>
      <p style="font-size: 1.25rem; color: #bac2de">
        A static blog platform that fetches and displays blog posts from GitHub
        Gists.
        <span class="text-ctp-peach">Styled with Catppuccin Mocha 🎨</span>
      </p>
    </section>

    <ClientOnly>
      <BlogList username="daveio" />
      <template #fallback>
        <div class="space-y-6">
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
      </template>
    </ClientOnly>
  </div>
</template>
