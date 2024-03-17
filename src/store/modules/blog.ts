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
  QueryDocumentSnapshot,
  DocumentData,
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
  savePost: (
    fields: FormFields,
    file: File | null,
    id?: string,
  ) => Promise<void>
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
      const posts: Post[] = snapshot.docs.map((doc) => _formatPost(doc))
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
      set(() => ({ loading: true }))
      const post = await getDoc(doc(db, 'posts', id))
      if (post.exists()) return _formatPost(post)
      return null
    } catch (error) {
      console.log('error:', error)
      return null
    } finally {
      set(() => ({ loading: false }))
    }
  },

  fetchLatestPosts: async () => {
    try {
      set(() => ({ loading: true }))
      const postsRef = collection(db, 'posts')
      const q = query(postsRef, orderBy('published', 'desc'), limit(2))
      const snapshot = await getDocs(q)
      return snapshot.docs.map((doc) => _formatPost(doc))
    } catch (error) {
      console.log('error:', error)
      return null
    } finally {
      set(() => ({ loading: false }))
    }
  },

  savePost: async (fields: FormFields, file: File | null, id?: string) => {
    try {
      set(() => ({ loading: true }))

      const { title, content, author } = fields
      if (!title.trim() || !content.trim() || !author.trim()) {
        throw new Error('One of the fields is missing')
      }

      let imageUrl = ''
      if (id) {
        const postRef = await getDoc(doc(db, 'posts', id))
        if (postRef.exists()) {
          imageUrl = postRef.data().imageUrl
        }
      }

      if (file) {
        const imageRef = ref(storage, 'images/' + file.name)
        await uploadBytes(imageRef, file)
        const url = await getDownloadURL(imageRef)

        imageUrl = url
      }

      const postData: any = {
        title,
        content,
        author,
        published: serverTimestamp(),
        readTime: Math.ceil(content.split(' ').length / 200),
        imageUrl,
      }

      if (id) {
        await updateDoc(doc(db, 'posts', id), postData)
      } else {
        await addDoc(collection(db, 'posts'), postData)
      }
    } catch (error) {
      console.log('error:', error)
    } finally {
      set(() => ({ loading: false }))
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

function _formatPost(doc: QueryDocumentSnapshot<DocumentData, DocumentData>) {
  return {
    id: doc.id,
    title: doc.data().title || '',
    content: doc.data().content || '',
    author: doc.data().author || '',
    published: doc.data().published || null,
    readTime: doc.data().readTime || 0,
    imageUrl: doc.data().imageUrl || '',
  }
}
