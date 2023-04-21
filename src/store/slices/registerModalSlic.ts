import { type RegisterModalSlice } from './types'



export const createRegisterModalSlice: RegisterModalSlice = set => ({
  isRegisterModalOpen: false,
  openRegisterModal: () => set({ isRegisterModalOpen: true }),
  closeRegisterModal: () => set({ isRegisterModalOpen: false })
})
