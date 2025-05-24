import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  compatibilityDate: "2025-05-24",
  devtools: { enabled: process.env.NODE_ENV === "development" },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"]
    }
  },
  app: {
    head: {
      title: "✨ GistPad",
      meta: [
        {
          name: "description",
          content: "A static blog platform that fetches and displays blog posts from GitHub Gists"
        }
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: ""
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Victor+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
        }
      ]
    }
  },
  // Minimize client-side JavaScript
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true
  },
  // Optimize for static generation
  routeRules: {
    "/**": { static: true }
  },
  typescript: {
    strict: false,
    typeCheck: false
  },
  generate: {
    fallback: true
  }
})
