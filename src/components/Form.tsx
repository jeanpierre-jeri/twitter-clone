import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'redaxios'


import { Avatar, Button } from '@/components'
import { usePosts, useUser } from '@/hooks'
import { useStore } from '@/store'



type FormProps = {
  placeholder?: string
  isComment?: boolean
  postId?: string
}

export function Form ({ placeholder = '' }: FormProps) {
  const { openLoginModal, openRegisterModal } = useStore(({ openLoginModal, openRegisterModal }) => ({ openLoginModal, openRegisterModal }))
  const { data: session } = useSession()
  const { user } = useUser(session?.user.id as string)
  const { mutate: mutatePosts } = usePosts()
  const [isLoading, setIsLoading] = useState(false)
  const [body, setBody] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      await axios.post('/api/posts', { body })
      setBody('')
      await mutatePosts()
      toast.success('Tweet Created')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <section className='border-b border-neutral-800 px-5 py-2'>
      {user
        ? (
          <article className='flex gap-4'>
            <div>
              <Avatar userId={user.id} />
            </div>
            <form className='w-full' onSubmit={handleSubmit}>
              <textarea
                value={body}
                onInput={e => setBody(e.currentTarget.value)}
                disabled={isLoading}
                className='disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-xl placeholder-neutral-500 text-white'
                placeholder={placeholder}
              />
              <hr className='opacity-0 peer-focus:opacity-100 h-px w-full border-neutral-800 transition-opacity' />

              <div className='mt-4 flex justify-end'>
                <Button disabled={isLoading || !body}>
                  Tweet
                </Button>
              </div>
            </form>
          </article>
          )
        : (

          <div className='py-8'>
            <h1 className='text-white text-2xl text-center mb-4 font-bold'>Welcome to Twitter!</h1>
            <div className='flex items-center justify-center gap-4'>
              <Button onClick={openLoginModal}>
                Login
              </Button>
              <Button onClick={openRegisterModal} secondary>
                Register
              </Button>
            </div>
          </div>
          )}
    </section>
  )
}
