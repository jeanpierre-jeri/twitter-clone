import { useState } from 'react'
import { useRouter } from 'next/router'
import { useStore } from '@/store'
import { useUser } from '@/hooks'
import { Modal, Input, ImageUpload } from '@/components'
import { toast } from 'react-hot-toast'
import axios from 'redaxios'
import { readFileAsDataUrl } from '@/lib/file'

export function EditModal() {
  const router = useRouter()
  const { user, mutate } = useUser((router.query?.userId as string) || '')
  const { closeEditModal, isEditModalOpen } = useStore(({ closeEditModal, isEditModalOpen }) => ({
    closeEditModal,
    isEditModalOpen
  }))
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const bio = formData.get('bio') as string
    const coverImage = formData.get('coverImage') as File
    const profileImage = formData.get('profileImage') as File

    if (!name) {
      toast.error('Name are required')
      return
    }

    setIsLoading(true)

    const coverImageData = coverImage.size > 0 ? await readFileAsDataUrl(coverImage) : ''
    const profileImageData = profileImage.size > 0 ? await readFileAsDataUrl(profileImage) : ''

    console.log(profileImageData)

    try {
      await axios.patch('/api/users/edit', {
        name,
        bio,
        coverImage: coverImageData,
        profileImage: profileImageData
      })

      mutate()
      toast.success('Profile updated successfully')
      closeEditModal()
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log(error)
      }
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={isEditModalOpen}
      title='Edit your profile'
      actionLabel='Save'
      onClose={closeEditModal}
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col md:flex-row justify-center gap-4'>
          <ImageUpload name='profileImage' base64={user?.profileImage || ''} disabled={isLoading}>
            Upload profile Image
          </ImageUpload>
          <ImageUpload
            name='coverImage'
            base64={user?.coverImage || ''}
            disabled={isLoading}
            className='aspect-video h-[100px] w-auto'
          >
            Upload cover Image
          </ImageUpload>
        </div>

        <Input name='name' placeholder='Name' disabled={isLoading} defaultValue={user?.name || ''} />

        <Input name='bio' placeholder='Bio' disabled={isLoading} defaultValue={user?.bio || ''} />
      </div>
    </Modal>
  )
}
