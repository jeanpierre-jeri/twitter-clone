type Props = {
  placeholder?: string
  name: string
  type?: string
  disabled?: boolean
  defaultValue?: string
}

export function Input ({ placeholder, disabled = false, name, type = 'text', defaultValue = '' }: Props) {
  return (
    <input
      disabled={disabled}
      name={name}
      placeholder={placeholder}
      type={type}
      className='w-full p-4 text-xl bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition-all disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed'
      defaultValue={defaultValue}
    />
  )
}
