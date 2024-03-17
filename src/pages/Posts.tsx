import { useEffect } from 'react'
import { useBoundStore } from '../store'
import Container from '../components/ui/container'
import Skeleton from '../components/ui/Skeleton'
import PostItem from '../components/PostItem'

export default function Posts() {
  const fetchPosts = useBoundStore((state) => state.fetchPosts)
  const posts = useBoundStore((state) => state.posts)
  const loading = useBoundStore((state) => state.loading)

  useEffect(() => {
    fetchPosts()
  }, [])

  let content: React.ReactNode = null
  if (loading) {
    content = <Skeleton />
  } else if (posts) {
    content = posts.map((post) => <PostItem key={post.id} post={post} />)
  }

  return (
    <main className="flex-1 py-10">
      <Container>
        <h1 className="mb-2.5 font-serif text-2xl">
          Dive into the <span className="text-indigo-600">Knowledge Pool</span>
        </h1>
        <p className="mb-7 max-w-lg font-light leading-relaxed text-neutral-600">
          Get your daily dose of tech knowledge and insightful tips with our
          latest blog posts.
        </p>
        <div className="grid gap-5 md:grid-cols-2">{content}</div>
      </Container>
    </main>
  )
}
