import { useState } from 'react'
import { useStore } from '@/store'
import { Input, Modal } from '@/components'

interface FormData {
  email: string
  name: string
  username: string
  password: string
}

export function RegisterModal() {
  const { closeRegisterModal, isRegisterModalOpen, openLoginModal } = useStore(
    ({ closeRegisterModal, isRegisterModalOpen, openLoginModal }) => ({
      closeRegisterModal,
      isRegisterModalOpen,
      openLoginModal
    })
  )

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    const {} = Object.fromEntries(formData) as unknown as FormData

    try {
      // TODO add Register and Login
      closeRegisterModal()
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = () => {
    if (isLoading) return

    closeRegisterModal()
    openLoginModal()
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={isRegisterModalOpen}
      title='Create an account'
      actionLabel='Register'
      onClose={closeRegisterModal}
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col gap-4'>
        <Input name='email' placeholder='Email' type='email' disabled={isLoading} />

        <Input name='name' placeholder='Name' disabled={isLoading} />

        <Input name='username' placeholder='Username' disabled={isLoading} />

        <Input name='password' placeholder='Password' type='password' disabled={isLoading} />
      </div>

      <p className='text-neutral-400 text-center mt-4'>
        Already have an account?{' '}
        <button onClick={handleToggle} className='text-white cursor-pointer hover:underline'>
          Sign in
        </button>
      </p>
    </Modal>
  )
}
