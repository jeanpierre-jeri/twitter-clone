import { useRouter } from 'next/router'
import { BackArrowIcon } from './Icons'

interface Props {
  label: string
  showBackArrow?: boolean
}

export function Header({ label, showBackArrow = false }: Props) {
  const router = useRouter()
  return (
    <div className='border-b border-neutral-800 p-5 flex items-center gap-2'>
      {showBackArrow && (
        <button onClick={() => router.back()} className='hover:opacity-70 transition-opacity text-white'>
          <BackArrowIcon />
        </button>
      )}
      <h1 className='text-white text-xl font-semibold'>{label}</h1>
    </div>
  )
}
