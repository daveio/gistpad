import { defineNitroPlugin } from "nitropack/runtime"
import { fetchAllBlogPosts } from "../utils/github"

export default defineNitroPlugin(async (nitroApp) => {
  try {
    // This code runs during build time
    const posts = await fetchAllBlogPosts("daveio")

    // Generate routes for each blog post
    const routes = posts.map((post) => `/blog/${post.id}`)

    // Add these routes to the prerender list
    nitroApp.hooks.hook("prerender:routes", (routes) => {
      for (const post of posts) {
        routes.add(`/blog/${post.id}`)
      }
    })

    console.log(`Generated ${routes.length} blog post routes for prerendering`)
  } catch (error) {
    console.error("Error generating routes:", error)
  }
})
