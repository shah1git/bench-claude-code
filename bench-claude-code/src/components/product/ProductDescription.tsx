interface ProductDescriptionProps {
  description?: string
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  if (!description) {
    return <p className="text-muted-foreground">Описание отсутствует.</p>
  }

  // Simple markdown-to-html for headings, bold, paragraphs, lists
  const html = markdownToHtml(description)

  return (
    <div className="max-w-3xl">
      <div
        className="prose prose-slate prose-sm sm:prose-base max-w-none
          prose-headings:font-semibold prose-headings:tracking-tight
          prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
          prose-p:leading-relaxed prose-p:text-muted-foreground
          prose-strong:text-foreground prose-strong:font-semibold
          prose-li:text-muted-foreground
          prose-ul:my-4 prose-li:my-1"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

function markdownToHtml(md: string): string {
  return md
    // Headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr>')
    // Line breaks → paragraphs (consecutive non-empty lines)
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<hr')) {
        return trimmed
      }
      return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`
    })
    .join('\n')
}
