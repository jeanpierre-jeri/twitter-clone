import { type RegisterModalSlice } from './types'

export const createRegisterModalSlice: RegisterModalSlice = (set) => ({
  isRegisterModalOpen: true,
  openRegisterModal: () => set({ isRegisterModalOpen: true }),
  closeRegisterModal: () => set({ isRegisterModalOpen: false })
})
