import { StateCreator } from 'zustand'
import { auth } from '../../services/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export interface AuthSlice {
  admin: boolean
  login: (email: string, password: string) => Promise<void>
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  admin: false,
  login: async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      set(() => ({ admin: true }))
    } catch (error) {
      console.log('There was an error logging as admin')
      set(() => ({ admin: false }))
      throw error
    }
  },
})
