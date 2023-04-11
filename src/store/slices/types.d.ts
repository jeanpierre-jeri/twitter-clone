import type { StateCreator } from 'zustand'

export interface LoginModal {
  isLoginModalOpen: boolean
  openLoginModal: () => void
  closeLoginModal: () => void
}

export interface RegisterModal {
  isRegisterModalOpen: boolean
  openRegisterModal: () => void
  closeRegisterModal: () => void
}

export type Store = LoginModal & RegisterModal

export type LoginModalSlice = StateCreator<Store, [], [], LoginModal>
export type RegisterModalSlice = StateCreator<Store, [], [], RegisterModal>
