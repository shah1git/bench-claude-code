import type { Metadata } from 'next'
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'
import config from '@payload-config'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

export async function generateMetadata({ params, searchParams }: Args): Promise<Metadata> {
  return generatePageMetadata({ config, params, searchParams })
}

export default async function NotFound({ params, searchParams }: Args) {
  return NotFoundPage({ config, importMap, params, searchParams })
}
