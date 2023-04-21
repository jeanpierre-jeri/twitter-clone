import { type EditModalSlice } from './types'



export const createEditModalSlice: EditModalSlice = set => ({
  isEditModalOpen: false,
  openEditModal: () => set({ isEditModalOpen: true }),
  closeEditModal: () => set({ isEditModalOpen: false })
})
