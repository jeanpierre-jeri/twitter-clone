import { useRouter } from 'next/router'

import { BackArrowIcon } from './Icons'



type Props = {
  label: string
  showBackArrow?: boolean
}

export function Header ({ label, showBackArrow = false }: Props) {
  const router = useRouter()
  return (
    <div className='border-b border-neutral-800 p-5 flex items-center gap-2'>
      {!!showBackArrow && (
      <button onClick={() => router.back()} className='hover:opacity-70 transition-opacity text-white w-5'>
        <BackArrowIcon />
      </button>
      )}
      <h1 className='text-white text-xl font-semibold'>{label}</h1>
    </div>
  )
}
