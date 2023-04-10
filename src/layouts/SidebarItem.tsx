import Link from 'next/link'
import { type PropsWithChildren } from 'react'

interface ItemProps extends PropsWithChildren {
  href?: string
  onClick?: () => void
  className: string
}

const Item = ({ href, children, onClick, className }: ItemProps) => {
  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <button type='button' className={className} onClick={onClick}>
      {children}
    </button>
  )
}

interface SidebarItemProps {
  label: string
  href?: string
  icon: JSX.Element
  onClick?: () => void
}

export function SidebarItem({ href, label, onClick, icon }: SidebarItemProps) {
  return (
    <Item href={href} className='flex items-center text-white' onClick={onClick}>
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
