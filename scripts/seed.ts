import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[а-яё]/g, (c) => {
      const map: Record<string, string> = {
        'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh',
        'з':'z','и':'i','й':'j','к':'k','л':'l','м':'m','н':'n','о':'o',
        'п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts',
        'ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'
      }
      return map[c] || c
    })
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function downloadImage(url: string, destPath: string): Promise<void> {
  const dir = path.dirname(destPath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const request = (reqUrl: string) => {
      protocol.get(reqUrl, { headers: { 'User-Agent': 'seed-script' } }, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = res.headers.location.startsWith('http')
            ? res.headers.location
            : new URL(res.headers.location, reqUrl).toString()
          // Follow redirect with https
          https.get(redirectUrl, (res2) => {
            const file = fs.createWriteStream(destPath)
            res2.pipe(file)
            file.on('finish', () => { file.close(); resolve() })
            file.on('error', reject)
          }).on('error', reject)
          return
        }
        const file = fs.createWriteStream(destPath)
        res.pipe(file)
        file.on('finish', () => { file.close(); resolve() })
        file.on('error', reject)
      }).on('error', reject)
    }
    request(url)
  })
}

async function fetchSnapshot(): Promise<any> {
  // Try reading local file first
  const localPath = path.join(projectRoot, 'snapshot.json')
  if (fs.existsSync(localPath)) {
    console.log('Using local snapshot.json')
    return JSON.parse(fs.readFileSync(localPath, 'utf-8'))
  }

  // Fetch from API
  const url = 'http://media.rikanv.ru/public/snapshots/f2b6743d91fbe2b12a4bad2cc7ed7e15'
  console.log('Fetching snapshot from API...')
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (res2) => {
          let data = ''
          res2.on('data', (chunk) => { data += chunk })
          res2.on('end', () => resolve(JSON.parse(data)))
        }).on('error', reject)
        return
      }
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => resolve(JSON.parse(data)))
    }).on('error', reject)
  })
}

async function seed() {
  console.log('Starting seed...')

  const payload = await getPayload({ config })
  const snapshot = await fetchSnapshot()

  const product = snapshot.catalog[0].products[0]
  const specSchema = snapshot.specSchemas[product.specType]
  const articles = snapshot.articles || []

  // Download images
  const imagesDir = path.join(projectRoot, 'public', 'images', 'products')
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true })

  console.log(`Downloading ${product.images.length} images...`)
  for (const img of product.images) {
    const dest = path.join(imagesDir, img.filename)
    if (fs.existsSync(dest)) {
      console.log(`  Skip (exists): ${img.filename}`)
      continue
    }
    console.log(`  Downloading: ${img.filename}`)
    try {
      await downloadImage(img.url, dest)
    } catch (err) {
      console.error(`  Failed to download ${img.filename}:`, err)
    }
  }

  // Clear existing data
  console.log('Clearing existing data...')
  try {
    const existingArticles = await payload.find({ collection: 'articles', limit: 100 })
    for (const a of existingArticles.docs) {
      await payload.delete({ collection: 'articles', id: a.id })
    }
    const existingProducts = await payload.find({ collection: 'products', limit: 100 })
    for (const p of existingProducts.docs) {
      await payload.delete({ collection: 'products', id: p.id })
    }
  } catch (e) {
    // Collections might not exist yet
  }

  // Create product
  const productSlug = 'rikanv-ovod-h50-lrf'
  console.log(`Creating product: ${product.name}`)

  const createdProduct = await payload.create({
    collection: 'products',
    data: {
      name: product.name,
      slug: productSlug,
      article: product.article,
      price: product.price,
      shortDescription: product.shortDescription,
      description: product.description,
      seoDescription: product.seoDescription || '',
      specType: product.specType,
      specs: product.specs,
      specSchema: specSchema?.sections || [],
      images: product.images.map((img: any) => ({
        url: `/images/products/${img.filename}`,
        filename: img.filename,
        alt: product.name,
      })),
      videoLinks: product.videoLinks || [],
      keySpecs: product.keySpecs || [],
      productLine: product.productLine,
      formFactor: product.formFactor,
      quantity: product.quantity,
    },
  })

  console.log(`Product created with ID: ${createdProduct.id}`)

  // Create articles
  for (const article of articles) {
    const articleSlug = slugify(article.title).substring(0, 80)
    console.log(`Creating article: ${article.title.substring(0, 60)}...`)

    await payload.create({
      collection: 'articles',
      data: {
        title: article.title,
        slug: articleSlug,
        body: article.body,
        products: [createdProduct.id],
        productLines: article.product_lines || article.productLines || [],
      },
    })
  }

  // Create admin user
  console.log('Creating admin user...')
  try {
    const existingUsers = await payload.find({
      collection: 'users',
      where: { email: { equals: 'admin@bench.test' } },
    })
    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@bench.test',
          password: 'admin123',
        },
      })
      console.log('Admin user created: admin@bench.test / admin123')
    } else {
      console.log('Admin user already exists')
    }
  } catch (e) {
    console.log('Admin user might already exist')
  }

  console.log('Seed completed!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
