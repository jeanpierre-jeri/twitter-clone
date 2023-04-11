import { create } from 'zustand'
import { type Store, createLoginModalSlice, createRegisterModalSlice } from './slices'

export const useStore = create<Store>()((...a) => ({
  ...createLoginModalSlice(...a),
  ...createRegisterModalSlice(...a)
}))
