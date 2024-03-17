import { useEffect } from 'react'
import { useBoundStore } from '../../store'
import { Link, useNavigate } from 'react-router-dom'
import { Pen, TrashSimple } from '@phosphor-icons/react'
import Container from '../ui/container'
import Skeleton from '../ui/Skeleton'
import PostItem from '../PostItem'

export default function Overview() {
  const fetchPosts = useBoundStore((state) => state.fetchPosts)
  const deletePost = useBoundStore((state) => state.deletePost)
  const loading = useBoundStore((state) => state.loading)
  const posts = useBoundStore((state) => state.posts)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [])

  let content: React.ReactNode = null
  if (loading) {
    content = <Skeleton />
  } else if (posts) {
    content = posts.map((post) => {
      const handleDelete = (ev: React.MouseEvent) => {
        ev.stopPropagation()
        deletePost(post.id)
      }

      const handleEdit = (ev: React.MouseEvent) => {
        ev.stopPropagation()
        navigate('edit/' + post.id)
      }

      return (
        <PostItem key={post.id} post={post}>
          <div className="mt-auto flex items-center gap-1 text-sm">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2.5 rounded bg-green-600 bg-opacity-5 px-3 py-2.5 text-green-600 transition hover:bg-opacity-10"
            >
              <Pen size={20} /> Update
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2.5 rounded bg-rose-600 bg-opacity-5 px-3 py-2.5 text-rose-600 transition hover:bg-opacity-10"
            >
              <TrashSimple size={20} /> Delete
            </button>
          </div>
        </PostItem>
      )
    })
  }

  return (
    <Container className="py-10">
      <div className="mb-7 flex items-center justify-between">
        <h1>Dashboard</h1>
        <Link
          to="edit"
          className="rounded bg-indigo-600 bg-opacity-5 px-4 py-2.5 text-indigo-600 transition hover:bg-opacity-10"
        >
          Create Post
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2">{content}</div>
    </Container>
  )
}
