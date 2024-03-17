import { useNavigate } from 'react-router-dom'
import { Post } from '../types'

interface PostItemProps {
  post: Post
  children?: React.ReactNode
}

export default function PostItem({ post, children }: PostItemProps) {
  let navigate = useNavigate()
  const date = post.published.toDate()
  const [_, day, month] = date.toUTCString().split(' ')

  const handleClick = (ev: React.MouseEvent) => {
    ev.stopPropagation()
    navigate('/posts/' + post.id)
  }

  return (
    <article
      onClick={handleClick}
      className="flex cursor-pointer flex-col overflow-hidden rounded border bg-white shadow-sm transition hover:shadow"
    >
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          className="h-40 object-cover"
          alt={post.title}
        />
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-sm font-medium tracking-wide text-indigo-600">
          {month} {day}
        </p>
        <h3 className="font-serif text-xl">{post.title}</h3>
        <p className="line-clamp-2 text-base font-light leading-relaxed text-neutral-600">
          {post.content}
        </p>
        <p className="mt-auto text-sm text-neutral-600">
          {post.author} · {post.readTime} mins read
        </p>
        {children}
      </div>
    </article>
  )
}
