import { create } from 'zustand'

interface User {
  isLoggedIn: boolean
}

interface CurrentUserState {
  user: User
  setUser: (user: User) => void
}

export const useCurrentUser = create<CurrentUserState>()((set) => ({
  user: { isLoggedIn: false },
  setUser: (user: User) => set({ user })
}))
