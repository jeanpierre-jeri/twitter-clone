import { FeatherIcon } from '@/components'
import { useStore } from '@/store'

export function SidebarTweetButton() {
  const openLoginModal = useStore((state) => state.openLoginModal)
  const handleClick = () => {
    openLoginModal()
  }
  return (
    <button onClick={handleClick} className='w-full'>
      <i className='mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-sky-500/80 transition-colors text-white'>
        <FeatherIcon />
      </i>
      <p className='text-center font-semibold text-white text-xl mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-500/80 transition-colors'>
        Tweet
      </p>
    </button>
  )
}
