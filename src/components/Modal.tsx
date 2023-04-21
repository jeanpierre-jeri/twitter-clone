import { Children, useEffect } from 'react'

import { Button } from './Button'
import { OutlineCloseIcon } from './Icons'

import type { PropsWithChildren } from 'react'



type Props = {
  isOpen?: boolean
  onClose?: () => void
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  title?: string
  actionLabel: string
  disabled?: boolean
} & PropsWithChildren

export function Modal ({
  isOpen = false,
  onClose,
  onSubmit,
  title = 'Modal',
  actionLabel,
  disabled = false,
  children
}: Props) {
  const [body, footer] = Children.toArray(children)

  const handleClose = () => {
    if (disabled) return
    onClose?.()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (disabled) return
    onSubmit?.(e)
  }

  useEffect(() => {
    const scrollbarWidth = `${window.innerWidth - document.body.clientWidth}px`
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = scrollbarWidth
    }

    return () => {
      document.body.style.overflow = 'auto scroll'
      document.body.style.paddingRight = '0px'
    }
  }, [isOpen])

  if (!isOpen) return null
  return (
    <div
      onClick={handleClose}
      className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'
    >
      <div
        onClick={e => e.stopPropagation()}
        className='relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto'
      >
        {/* Content */}
        <div className='h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none'>
          {/* Header */}
          <header className='flex items-center justify-between p-10 rounded-t'>
            <h3 className='text-3xl font-semibold text-white'>{title}</h3>
            <button onClick={handleClose} className='w-8 p-1 border-0 text-white hover:opacity-70 transition-opacity'>
              <OutlineCloseIcon />
            </button>
          </header>
          {/* Body */}
          <form onSubmit={handleSubmit}>
            <div className='relative p-10 flex-auto'>{body}</div>
            {/* Footer */}
            <footer className='flex flex-col gap-2 p-10'>
              <div>
                <Button disabled={disabled} secondary fullWidth large>
                  {actionLabel}
                </Button>
                {footer}
              </div>
            </footer>
          </form>
        </div>
      </div>
    </div>
  )
}
