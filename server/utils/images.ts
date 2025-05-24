/**
 * Formats a date string into a human-readable format
 * @param dateString Date string in ISO format
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)

    // Check if date is valid
    if (Number.isNaN(date.getTime())) {
      return dateString
    }

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date)
  } catch (error) {
    console.error("Error formatting date:", error)
    return dateString
  }
}

/**
 * Creates an excerpt from markdown content
 * @param content Markdown content
 * @returns Excerpt string
 */
export function createExcerpt(content: string, maxLength = 160): string {
  // Remove markdown formatting
  const plainText = content
    .replace(/#+\s+(.*)/g, "$1") // Remove headings
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
    .replace(/\*(.*?)\*/g, "$1") // Remove italic
    .replace(/\[(.*?)\]$$(.*?)$$/g, "$1") // Remove links
    .replace(/`(.*?)`/g, "$1") // Remove inline code
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/^\s*>\s*(.*)/gm, "$1") // Remove blockquotes
    .replace(/!\[(.*?)\]$$(.*?)$$/g, "[Image: $1]") // Replace images
    .replace(/^\s*[-*+]\s+/gm, "") // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, "") // Remove numbered list markers
    .trim()

  // Get the first paragraph or a portion of it
  const firstParagraph = plainText.split("\n\n")[0]

  // Truncate to maxLength and add ellipsis if needed
  if (firstParagraph.length <= maxLength) {
    return firstParagraph
  }

  // Find a good breaking point (end of a sentence or word)
  let breakPoint = firstParagraph.lastIndexOf(". ", maxLength - 3)
  if (breakPoint === -1 || breakPoint < maxLength / 2) {
    breakPoint = firstParagraph.lastIndexOf(" ", maxLength - 3)
  }

  if (breakPoint === -1) {
    breakPoint = maxLength - 3
  }

  return `${firstParagraph.substring(0, breakPoint)}...`
}
