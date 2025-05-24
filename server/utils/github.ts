import crypto from "node:crypto"
import { promises as fs } from "node:fs"
import path from "node:path"

/**
 * Downloads and saves an image locally during build time
 * @param imageUrl URL of the image to download
 * @returns Local path to the saved image
 */
export async function downloadAndSaveImage(imageUrl: string): Promise<string> {
  try {
    // Create a hash of the URL to use as filename
    const urlHash = crypto.createHash("md5").update(imageUrl).digest("hex")
    const extension = path.extname(imageUrl) || ".jpg" // Default to jpg if no extension
    const filename = `${urlHash}${extension}`

    // Ensure the public/images directory exists
    const imagesDir = path.resolve(process.cwd(), "public/images")
    try {
      await fs.mkdir(imagesDir, { recursive: true })
    } catch (err) {
      console.warn("Images directory already exists or could not be created:", err)
    }

    const imagePath = path.join(imagesDir, filename)
    const publicPath = `/images/${filename}`

    // Check if the image already exists
    try {
      await fs.access(imagePath)
      console.log(`Image already exists: ${publicPath}`)
      return publicPath
    } catch {
      // Image doesn't exist, download it
      const response = await fetch(imageUrl)

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`)
      }

      const buffer = await response.arrayBuffer()
      await fs.writeFile(imagePath, Buffer.from(buffer))

      console.log(`Downloaded image: ${publicPath}`)
      return publicPath
    }
  } catch (error) {
    console.error("Error downloading image:", imageUrl, error)
    // Return the original URL as fallback
    return imageUrl
  }
}
