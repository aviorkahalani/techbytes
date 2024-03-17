import { useParams } from 'react-router-dom'
import Container from '../ui/container'
import { useEffect, useState } from 'react'
import { Post } from '../../types'
import { useBoundStore } from '../../store'
import PostForm from './PostForm'

export default function Edit() {
  const fetchPostById = useBoundStore((state) => state.fetchPostById)
  const params = useParams<{ id: string }>()
  const [post, setPost] = useState<Partial<Post> | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchPostById(params.id).then((p) => {
        setPost(p)
      })
    } else {
      setPost({
        title: '',
        content: '',
        readTime: 0,
        author: '',
      })
    }
  }, [])

  return (
    <Container className="py-10">
      <h1 className="mb-7 font-serif text-2xl font-medium">
        {params.id ? 'Edit' : 'Create'} Blog Post
      </h1>
      {post && <PostForm post={post} />}
    </Container>
  )
}
