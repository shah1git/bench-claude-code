'use client'

import { useState } from 'react'
import Link from 'next/link'

type SpecSection = {
  id: string
  label_ru: string
  params: { id: string; label_ru: string }[]
}

type Article = {
  id: number
  title: string
  slug: string
}

type VideoLink = {
  url: string
  title: string
}

type Props = {
  description: string
  specSchema: SpecSection[]
  specs: Record<string, string>
  videoLinks: VideoLink[]
  articles: Article[]
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  return match ? match[1] : null
}

export function ProductTabs({ description, specSchema, specs, videoLinks, articles }: Props) {
  const tabs = [
    { id: 'description', label: 'Описание' },
    { id: 'specs', label: 'Характеристики' },
    ...(videoLinks.length > 0 ? [{ id: 'video', label: 'Видео' }] : []),
    ...(articles.length > 0 ? [{ id: 'articles', label: 'Статьи' }] : []),
  ]

  const [activeTab, setActiveTab] = useState('description')

  return (
    <div>
      {/* Tab bar */}
      <div className="border-b border-gray-200 overflow-x-auto scrollbar-hide">
        <div className="flex gap-0 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.id === 'video' && (
                <span className="ml-1.5 text-xs text-gray-300">{videoLinks.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="py-8">
        {/* Description */}
        {activeTab === 'description' && (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {/* Specifications - all sections expanded */}
        {activeTab === 'specs' && (
          <div className="space-y-6">
            {specSchema.map((section) => {
              const sectionSpecs = section.params.filter((p) => specs[p.id])
              if (sectionSpecs.length === 0) return null

              return (
                <div key={section.id}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 pl-1">
                    {section.label_ru}
                  </h3>
                  <div className="rounded-xl border border-gray-100 overflow-hidden">
                    {sectionSpecs.map((param, i) => (
                      <div
                        key={param.id}
                        className={`flex justify-between items-baseline px-4 py-3 text-sm ${
                          i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
                        } ${i < sectionSpecs.length - 1 ? 'border-b border-gray-50' : ''}`}
                      >
                        <span className="text-gray-500 min-w-0">{param.label_ru}</span>
                        <span className="text-gray-900 font-medium text-right ml-6 flex-shrink-0">
                          {specs[param.id]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Video */}
        {activeTab === 'video' && (
          <div className="space-y-8">
            {videoLinks.map((video, i) => {
              const ytId = getYouTubeId(video.url)
              return (
                <div key={i}>
                  {video.title && (
                    <h3 className="text-base font-medium text-gray-900 mb-3">{video.title}</h3>
                  )}
                  {ytId ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 max-w-3xl">
                      <iframe
                        src={`https://www.youtube.com/embed/${ytId}`}
                        title={video.title}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {video.url}
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Articles */}
        {activeTab === 'articles' && (
          <div className="grid gap-3 max-w-2xl">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-accent/30 hover:bg-accent/5 transition-all group"
              >
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-accent flex-shrink-0 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <span className="text-gray-700 group-hover:text-gray-900 text-sm font-medium transition-colors">
                  {article.title}
                </span>
                <svg
                  className="w-4 h-4 text-gray-200 group-hover:text-accent ml-auto flex-shrink-0 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
