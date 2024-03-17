import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBoundStore } from '../../store'
import { Post } from '../../types'

interface PostFormProps {
  post: Partial<Post>
}

export default function PostForm({ post }: PostFormProps) {
  const savePost = useBoundStore((state) => state.savePost)
  const navigate = useNavigate()

  const [file, setFile] = useState<File | null>(null)
  const [fields, setFields] = useState({
    title: post.title || '',
    imageUrl: post.imageUrl || '',
    content: post.content || '',
    author: post.author || '',
  })

  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = ev.target.name
    const value = ev.target.value

    setFields((prevFields) => ({ ...prevFields, [field]: value }))
  }

  const handleChangeImage = (
    ev: React.ChangeEvent<HTMLInputElement & { files: FileList }>,
  ) => {
    setFile(ev.target.files[0])
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (post.id) {
      await savePost(fields, file, post.id)
      navigate('/admin')
    } else {
      await savePost(fields, file)
      navigate('/admin')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="text-sm font-medium uppercase tracking-wide"
        >
          Blog Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={fields.title}
          onChange={handleChange}
          className="w-full rounded border p-4 outline-none transition focus:border-indigo-600"
          autoFocus
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="mb-2 block text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white"
          htmlFor="image"
        >
          Blog Image
        </label>

        <input
          id="image"
          name="imageUrl"
          type="file"
          onChange={handleChangeImage}
          accept="image/png, image/jpeg, image/webp, image/jpg"
          className="text-grey-500 text-sm file:mr-5 file:rounded-full file:border-0 file:bg-blue-50 file:px-6 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="author"
          className="text-sm font-medium uppercase tracking-wide"
        >
          Blog Author
        </label>
        <input
          id="author"
          name="author"
          type="text"
          value={fields.author}
          onChange={handleChange}
          className="w-full rounded border p-4 outline-none transition focus:border-indigo-600"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="content"
          className="text-sm font-medium uppercase tracking-wide"
        >
          Blog Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={10}
          value={fields.content}
          onChange={handleChange}
          className="w-full rounded border p-4 outline-none transition focus:border-indigo-600"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-indigo-600 p-3 text-sm font-medium uppercase tracking-wide text-white transition hover:bg-opacity-85"
      >
        Post Blog
      </button>
    </form>
  )
}
