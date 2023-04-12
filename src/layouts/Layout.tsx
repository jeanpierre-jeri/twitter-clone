import { useEffect, type PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import { Sidebar, FollowBar } from '@/layouts'
import { RegisterModal, LoginModal } from '@/components/modals'
import { useStore } from '@/store'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export function Layout({ children }: PropsWithChildren) {
  const { status } = useSession()
  const router = useRouter()
  const openLoginModal = useStore((state) => state.openLoginModal)

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const isProtectedRoute = url.startsWith('/notifications') || url.startsWith('/user')

      if (isProtectedRoute && status === 'unauthenticated') {
        openLoginModal()
        throw 'Not authenticated'
      }
      return url
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  })
  return (
    <>
      <main className='min-h-screen bg-black'>
        <div className='container min-h-screen mx-auto xl:px-30 max-w-6xl'>
          <div className='grid grid-cols-4 min-h-screen'>
            <Sidebar />
            <section className='col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800'>{children}</section>
            <FollowBar />
          </div>
        </div>
      </main>
      <LoginModal />
      <RegisterModal />
      <Toaster />
    </>
  )
}
