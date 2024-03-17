import { Timestamp } from 'firebase/firestore'

export interface Post {
  id: string
  title: string
  content: string
  published: Timestamp
  readTime: number
  author: string
  imageUrl: string
}

export interface FormFields {
  title: string
  imageUrl: string
  author: string
  content: string
}
