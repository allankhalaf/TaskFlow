import { create } from 'zustand'
import { currentUser } from '@/data/demoData'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: currentUser,
  isAuthenticated: true,
  login: (email, password) => {
    if (email && password) {
      set({ user: currentUser, isAuthenticated: true })
      return true
    }
    return false
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  updateProfile: (data) => set((state) => ({
    user: state.user ? { ...state.user, ...data } : null
  })),
}))
