import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { Input, Modal } from '@/components'
import { useStore } from '@/store'



type FormData = {
  email: string
  password: string
}

export function LoginModal () {
  const { closeLoginModal, isLoginModalOpen, openRegisterModal } = useStore(
    ({ closeLoginModal, isLoginModalOpen, openRegisterModal }) => ({
      closeLoginModal,
      isLoginModalOpen,
      openRegisterModal
    })
  )

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    const { email, password } = Object.fromEntries(formData) as unknown as FormData

    if ([email, password].includes('')) {
      toast.error('Email and password are required')
      return
    }

    setIsLoading(true)

    try {
      // TODO Add Login
      await signIn('credentials', { email, password })

      closeLoginModal()
    } catch (error) {
      if (process.env.NODE_ENV === 'development')
        console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = () => {
    if (isLoading) return

    closeLoginModal()
    openRegisterModal()
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={isLoginModalOpen}
      title='Login'
      actionLabel='Sign in'
      onClose={closeLoginModal}
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col gap-4'>
        <Input name='email' placeholder='Email' type='email' disabled={isLoading} />

        <Input name='password' placeholder='Password' disabled={isLoading} type='password' />
      </div>

      <p className='text-neutral-400 text-center mt-4'>
        First time using twitter?{' '}
        <button onClick={handleToggle} className='text-white cursor-pointer hover:underline'>
          Create an account
        </button>
      </p>
    </Modal>
  )
}
