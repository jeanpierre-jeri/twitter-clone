import { type LoginModalSlice } from './types'

export const createLoginModalSlice: LoginModalSlice = (set) => ({
  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false })
})
