import { create } from 'zustand'
import { createAuthSlice, AuthSlice } from './modules/auth'
import { createBlogSlice, BlogSlice } from './modules/blog'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useBoundStore = create<AuthSlice & BlogSlice>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createBlogSlice(...a),
    }),
    {
      name: 'auth_db',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ admin: state.admin }),
    },
  ),
)
