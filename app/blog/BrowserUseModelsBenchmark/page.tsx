import BlogPostPage, { generateMetadata as generateBlogPostMetadata } from '../[slug]/page'

const params = Promise.resolve({ slug: 'BrowserUseModelsBenchmark' })

export async function generateMetadata() {
  return generateBlogPostMetadata({ params })
}

export default function Page() {
  return <BlogPostPage params={params} />
}
