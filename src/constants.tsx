import { BellIcon, HouseIcon, UserIcon } from './components'

export const ITEMS = [
  {
    label: 'Home',
    href: '/',
    icon: <HouseIcon />,
    auth: false
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: <BellIcon />,
    auth: true
  },
  {
    label: 'Profile',
    href: '/users/123',
    icon: <UserIcon />,
    auth: true
  }
]
