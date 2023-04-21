import Head from 'next/head'
import { type PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

import { RegisterModal, LoginModal, EditModal } from '@/components/modals'
import { Sidebar, FollowBar } from '@/layouts'



export function Layout ({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>Twitter</title>
      </Head>
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
      <EditModal />
      <Toaster toastOptions={{ style: { backgroundColor: '#262626', color: '#eee' } }} />
    </>
  )
}
