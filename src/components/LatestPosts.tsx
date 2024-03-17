import { useEffect, useState } from 'react'
import { useBoundStore } from '../store'
import { Link } from 'react-router-dom'
import { Post } from '../types'
import Container from './ui/container'
import PostItem from './PostItem'
import Skeleton from './ui/Skeleton'

export default function LatestPosts() {
  const [latestPosts, setLatestPosts] = useState<Post[] | null>(null)
  const fetchLatestPosts = useBoundStore((state) => state.fetchLatestPosts)

  useEffect(() => {
    fetchLatestPosts().then((posts) => {
      setLatestPosts(posts)
    })
  }, [])

  let content: React.ReactNode = null
  if (latestPosts) {
    content = latestPosts.map((post) => <PostItem key={post.id} post={post} />)
  } else {
    content = <Skeleton />
  }

  return (
    <Container className="py-10">
      <div className="mb-7 flex items-center justify-between ">
        <h2 className="text-xl md:text-2xl">Latest Posts</h2>
        <Link to="/posts" className="text-sm underline underline-offset-2">
          Read All posts →
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2">{content}</div>
    </Container>
  )
}
