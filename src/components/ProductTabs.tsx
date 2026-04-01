'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SpecsAccordion } from './SpecsAccordion'
import { FileText, ChevronRight } from 'lucide-react'

type SpecSection = {
  id: string
  label_ru: string
  params: { id: string; label_ru: string }[]
}

type VideoLink = {
  url: string
  title?: string
}

type ArticleLink = {
  id: number
  slug: string
  title: string
}

type Props = {
  descriptionHtml?: string
  specSchema?: SpecSection[]
  specs?: Record<string, string>
  videoLinks?: VideoLink[]
  articles?: ArticleLink[]
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  return match ? match[1] : null
}

export function ProductTabs({ descriptionHtml, specSchema, specs, videoLinks, articles }: Props) {
  const tabs = [
    ...(descriptionHtml ? [{ id: 'description', label: 'Описание' }] : []),
    ...(specSchema?.length ? [{ id: 'specs', label: 'Характеристики' }] : []),
    ...(videoLinks?.length ? [{ id: 'video', label: 'Видео' }] : []),
    ...(articles?.length ? [{ id: 'articles', label: 'Статьи' }] : []),
  ]

  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')

  if (tabs.length === 0) return null

  return (
    <div>
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-6 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="py-8 min-h-[400px]">
        {activeTab === 'description' && descriptionHtml && (
          <div
            className="prose max-w-4xl"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        )}

        {activeTab === 'specs' && specSchema && specs && (
          <div className="max-w-3xl">
            <SpecsAccordion specSchema={specSchema} specs={specs} />
          </div>
        )}

        {activeTab === 'video' && videoLinks && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {videoLinks.map((video, i) => {
              const ytId = getYouTubeId(video.url)
              if (!ytId) return null
              return (
                <div key={i}>
                  {video.title && (
                    <h3 className="text-sm font-medium text-gray-700 mb-2">{video.title}</h3>
                  )}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}`}
                      title={video.title || 'Video'}
                      className="absolute inset-0 w-full h-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'articles' && articles && (
          <div className="grid gap-3 max-w-2xl">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-accent/30 hover:bg-accent/5 transition-all group"
              >
                <FileText className="w-5 h-5 text-gray-300 group-hover:text-accent flex-shrink-0 transition-colors" />
                <span className="text-gray-700 group-hover:text-gray-900 text-sm font-medium transition-colors flex-1">
                  {article.title}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-accent flex-shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
