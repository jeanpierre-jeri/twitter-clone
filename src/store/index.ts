import { create } from 'zustand'

import { type Store, createLoginModalSlice, createRegisterModalSlice, createEditModalSlice } from './slices'



export const useStore = create<Store>()((...a) => ({
  ...createLoginModalSlice(...a),
  ...createRegisterModalSlice(...a),
  ...createEditModalSlice(...a)
}))
