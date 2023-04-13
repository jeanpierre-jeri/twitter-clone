import { Avatar } from '@/components'
import { useUsers } from '@/hooks'

export function FollowBar() {
  const { users = [] } = useUsers()

  if (users.length === 0) return null

  return (
    <aside className='px-6 py-4 hidden lg:block'>
      <div className='bg-neutral-800 rounded-xl p-4'>
        <h2 className='text-white text-xl font-semibold'>Who to follow</h2>

        <ul className='flex flex-col gap-6 mt-4'>
          {users.map(({ id, name, username }) => (
            <li key={id} className='flex gap-4 items-center'>
              <Avatar userId={id} />
              <div className='flex flex-col'>
                <h3 className='text-white font-semibold text-sm'>{name}</h3>
                <p className='text-neutral-400 text-sm'>@{username}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
