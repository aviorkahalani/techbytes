import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useBoundStore } from '../store'
import Container from '../components/ui/container'
import { Post } from '../types'
import PostSkeleton from '../components/ui/PostSkeleton'

export default function PostDetail() {
  const fetchPostById = useBoundStore((state) => state.fetchPostById)
  const parmas = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    if (parmas.id) {
      fetchPostById(parmas.id).then((post) => {
        setPost(post)
      })
    }
  }, [])

  let content: React.ReactNode = null
  if (!post) {
    content = <PostSkeleton />
  } else {
    const date = post.published.toDate()
    const [_, day, month] = date.toUTCString().split(' ')

    content = (
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <span className="uppercase tracking-wide text-indigo-600">
            {month} {day}
          </span>
          <span>·</span>
          <span>{post.readTime} mins read</span>
          <span>·</span>
          <span>{post.author}</span>
        </div>

        <h1 className="text-3xl">{post.title}</h1>

        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-80 rounded object-cover"
        />

        <p className="mt-7 whitespace-pre-wrap">{post.content}</p>
      </div>
    )
  }

  return (
    <main className="flex-1 py-10">
      <Container className="flex flex-col gap-2.5">{content}</Container>
    </main>
  )
}
