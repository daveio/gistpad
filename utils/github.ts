import type { Gist } from "../types";
import { createExcerpt } from "./helpers";

// GitHub API endpoints
const API_BASE = "https://api.github.com";

// Simple in-memory cache to avoid repeated requests (frontend-only)
const cache = new Map<string, any>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: any;
  timestamp: number;
}

function getCachedData(key: string): any | null {
  const entry = cache.get(key) as CacheEntry;
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    return entry.data;
  }
  cache.delete(key);
  return null;
}

function setCachedData(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Fetches public gists for a specific GitHub user (client-side only)
 * @param username GitHub username
 * @returns Array of gist objects
 */
export async function fetchGists(username: string): Promise<Gist[]> {
  const cacheKey = `gists-${username}`;
  const cached = getCachedData(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(`${API_BASE}/users/${username}/gists`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching gists:", error);
    throw error;
  }
}

/**
 * Fetches a specific gist by ID (client-side only)
 * @param id Gist ID
 * @returns Gist object
 */
export async function fetchGistById(id: string): Promise<Gist | null> {
  const cacheKey = `gist-${id}`;
  const cached = getCachedData(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(`${API_BASE}/gists/${id}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching gist ${id}:`, error);
    throw error;
  }
}

/**
 * Fetches the raw content of a file from a gist (client-side only)
 * @param url Raw URL of the file
 * @returns File content as string
 */
export async function fetchGistContent(url: string): Promise<string> {
  const cacheKey = `content-${url}`;
  const cached = getCachedData(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch gist content: ${response.status} ${response.statusText}`);
    }

    const data = await response.text();
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching gist content:", error);
    throw error;
  }
}

/**
 * Extracts metadata from a gist (client-side only)
 * @param gist Gist object from GitHub API
 * @returns Metadata object
 */
export async function parseGistMetadata(gist: Gist): Promise<any> {
  try {
    // Look for metadata.yaml file
    const files = gist.files;
    const metadataFile = Object.values(files).find(
      (file) => file.filename === "metadata.yaml" || file.filename === "metadata.yml",
    );

    let metadata = {};

    if (metadataFile) {
      try {
        // Fetch and parse the metadata file
        const metadataContent = await fetchGistContent(metadataFile.raw_url);
        // Use js-yaml from CDN (client-side)
        const jsYaml = await import("https://esm.sh/js-yaml@4.1.0");
        metadata = jsYaml.load(metadataContent) || {};
      } catch (yamlError) {
        console.warn("Error parsing YAML metadata:", yamlError);
        // Continue without metadata if YAML parsing fails
      }
    }

    // If no excerpt in metadata, try to get a preview from the content
    if (!Object.prototype.hasOwnProperty.call(metadata, "excerpt")) {
      // Look for markdown content file (now entry.md instead of post.md)
      const contentFile = Object.values(files).find(
        (file) => file.filename === "entry.md" || (file.filename.endsWith(".md") && file.filename !== "metadata.md"),
      );

      if (contentFile) {
        try {
          // Fetch the first part of the content for a preview
          const content = await fetchGistContent(contentFile.raw_url);
          // Create an excerpt from the content
          const excerpt = createExcerpt(content);
          metadata = { ...metadata, excerpt };
        } catch (contentError) {
          console.warn("Error fetching content for excerpt:", contentError);
        }
      }
    }

    return metadata || {};
  } catch (error) {
    console.warn("Error parsing gist metadata:", error);
    return {};
  }
}

/**
 * Parses the full content of a gist (metadata + markdown) (client-side only)
 * @param gist Gist object from GitHub API
 * @returns Object with metadata and content
 */
export async function parseGistContent(gist: Gist): Promise<{ metadata: any; content: string }> {
  try {
    const files = gist.files;

    // Get metadata
    const metadata = await parseGistMetadata(gist);

    // Look for markdown content file (now entry.md instead of post.md)
    const contentFile = Object.values(files).find(
      (file) => file.filename === "entry.md" || (file.filename.endsWith(".md") && file.filename !== "metadata.md"),
    );

    if (!contentFile) {
      throw new Error("No markdown content found in gist");
    }

    // Fetch the markdown content
    const content = await fetchGistContent(contentFile.raw_url);

    return {
      metadata,
      content,
    };
  } catch (error) {
    console.error("Error parsing gist content:", error);
    throw error;
  }
}
