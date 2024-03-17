import { StateCreator } from 'zustand'
import { db, storage } from '../../services/firebase'
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FormFields, Post } from '../../types'

export interface BlogSlice {
  posts: Post[] | null
  loading: boolean
  error: Error | null
  fetchPosts: () => Promise<void>
  fetchPostById: (id: string) => Promise<Post | null>
  fetchLatestPosts: () => Promise<Post[] | null>
  createPost: (fields: FormFields, file: File | null) => Promise<void>
  editPost: (id: string, fields: FormFields, file: File | null) => Promise<void>
  deletePost: (id: string) => Promise<void>
}

export const createBlogSlice: StateCreator<BlogSlice> = (set) => ({
  posts: null,
  loading: false,
  error: null,

  fetchPosts: async () => {
    try {
      set(() => ({ loading: true }))
      const snapshot = await getDocs(collection(db, 'posts'))
      const posts: Post[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title || '',
        content: doc.data().content || '',
        author: doc.data().author || '',
        published: doc.data().published || null,
        readTime: doc.data().readTime || 0,
        imageUrl: doc.data().imageUrl || '',
      }))
      set(() => ({ posts }))
    } catch (error: unknown) {
      set(() => ({
        error: new Error('There was an error fetching posts from db.'),
      }))
    } finally {
      set(() => ({ loading: false }))
    }
  },

  fetchPostById: async (id: string) => {
    try {
      const post = await getDoc(doc(db, 'posts', id))
      if (post.exists()) {
        return {
          id: post.id,
          title: post.data().title || '',
          content: post.data().content || '',
          author: post.data().author || '',
          published: post.data().published || null,
          readTime: post.data().readTime || 0,
          imageUrl: post.data().imageUrl || '',
        }
      }
      return null
    } catch (error) {
      console.log('error:', error)
      return null
    }
  },

  fetchLatestPosts: async () => {
    try {
      set(() => ({ loading: true }))
      const postsRef = collection(db, 'posts')
      const q = query(postsRef, orderBy('published', 'desc'), limit(2))
      const snapshot = await getDocs(q)
      const posts: Post[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title || '',
        content: doc.data().content || '',
        author: doc.data().author || '',
        published: doc.data().published || null,
        readTime: doc.data().readTime || 0,
        imageUrl: doc.data().imageUrl || '',
      }))
      return posts
    } catch (error) {
      console.log('error:', error)
      return null
    }
  },

  createPost: async (fields: FormFields, file: File | null) => {
    try {
      const { title, content, author } = fields
      if (!title.trim() || !content.trim() || !author.trim()) {
        throw new Error('One of the field is missing')
      }

      let imageUrl = ''
      if (file) {
        const imagesRef = ref(storage, 'images/' + file.name)
        await uploadBytes(imagesRef, file)
        const imageRef = ref(storage, 'images/' + file.name)
        const url = await getDownloadURL(imageRef)

        imageUrl = url
      }

      const post = await addDoc(collection(db, 'posts'), {
        title,
        content,
        author,
        published: serverTimestamp(),
        readTime: Math.ceil(content.split(' ').length / 200),
        imageUrl,
      })

      console.log('post:', post)
    } catch (error) {
      console.log('error:', error)
    }
  },

  editPost: async (id: string, fields: FormFields, file: File | null) => {
    try {
      const { title, content, author } = fields
      if (!title.trim() || !content.trim() || !author.trim()) {
        throw new Error('One of the field is missing')
      }

      const postToUpdate: Partial<Post> = {
        title,
        content,
        author,
      }

      if (file) {
        const imagesRef = ref(storage, 'images/' + file.name)
        await uploadBytes(imagesRef, file)
        const imageRef = ref(storage, 'images/' + file.name)
        const url = await getDownloadURL(imageRef)

        postToUpdate['imageUrl'] = url
      }

      await updateDoc(doc(db, 'posts', id), postToUpdate)
    } catch (error) {
      console.log('error:', error)
    }
  },
  deletePost: async (id: string) => {
    try {
      await deleteDoc(doc(db, 'posts', id))

      set((state) => ({ posts: state.posts?.filter((post) => post.id !== id) }))
    } catch (error) {
      console.log('Could not delete post with id' + id)
    }
  },
})
