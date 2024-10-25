import { create } from 'zustand'

interface User {
  uuid: string
  email: string
  username: string
}

interface CurrentUserState {
  isLoggedIn: boolean
  setIsLoggedIn: (logged: boolean) => void
  user: User
  setUser: (user: User) => void
  clearUser: () => void
}

const initialState: User = {
  uuid: '',
  email: '',
  username: ''
}

export const useCurrentUser = create<CurrentUserState>()((set) => ({
  user: initialState,
  isLoggedIn: false,
  setIsLoggedIn: (logged) => set({ isLoggedIn: logged }),
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: initialState })
}))
