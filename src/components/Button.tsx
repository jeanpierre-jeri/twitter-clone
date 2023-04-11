import type { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  secondary?: boolean
  onClick?: () => void
  disabled?: boolean
  outline?: boolean
  fullWidth?: boolean
  large?: boolean
}

export function Button({ children, disabled, onClick, outline, secondary, fullWidth, large }: Props) {
  return (
    <button
      disabled={disabled}
      className={`
      disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition-opacity border-2 
      ${fullWidth ? 'w-full' : 'w-fit'}
      ${secondary ? 'bg-white text-black border-black' : 'bg-sky-500 text-white border-sky-500'} 
      ${large ? 'text-xl px-5 py-3' : 'text-base px-4 py-2'} 
      ${outline ? 'bg-transparent border-white text-white' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
