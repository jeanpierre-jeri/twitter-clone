import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import type { PropsWithChildren, ReactNode } from 'react'

import { useStore } from '@/store'



type ItemProps = {
  href?: string
  onClick?: () => void
  className: string
  auth?: boolean
} & PropsWithChildren

const Item = ({ href, children, onClick, className, auth = false }: ItemProps) => {
  const router = useRouter()
  const { status } = useSession()
  const openLoginModal = useStore(state => state.openLoginModal)

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMainEvent = e.button === 0 // primary click
    const isModifiedEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey
    if (isMainEvent && !isModifiedEvent)
      e.preventDefault()


    if (auth && status === 'unauthenticated') {
      openLoginModal()
      return false
    }

    await router.push(href ?? '/')
  }

  return href
    ? (
      <Link href={href} className={className} onClick={handleClick}>
        {children}
      </Link>
      )
    : (
      <button type='button' className={className} onClick={onClick}>
        {children}
      </button>
      )
}

type SidebarItemProps = {
  label: string
  href?: string
  icon: ReactNode
  onClick?: () => void
  auth?: boolean
}

export function SidebarItem ({ href, label, onClick, icon, auth = false }: SidebarItemProps) {
  return (
    <Item href={href} className='flex items-center text-white w-fit' onClick={onClick} auth={auth}>
      <i className='relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300/10 lg:hidden text-white'>
        {icon}
      </i>
      <div className='text-white relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300/10 items-center'>
        <i className='w-6'>{icon}</i>
        <h3 className='hidden lg:block text-white text-xl'>{label}</h3>
      </div>
    </Item>
  )
}
