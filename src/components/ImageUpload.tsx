import Image from 'next/image'
import { useState, type PropsWithChildren } from 'react'
import { useDropzone } from 'react-dropzone'



type ImageUploadProps = {
  base64?: string
  disabled?: boolean
  name: string
  className?: string
  setImage: (image: File) => void
} & PropsWithChildren

export function ImageUpload ({
  base64: initialState = '',
  children,
  disabled = false,
  name,
  className = '',
  setImage
}: ImageUploadProps) {
  const [base64, setBase64] = useState(initialState)

  const onDrop = async (files: Array<File>) => {
    const base64 = URL.createObjectURL(files[0])
    setBase64(base64)
    setImage(files[0])
  }

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop,
    disabled,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
  })

  return (
    <div
      className='w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 min-h-[100px] flex justify-center items-center'
      {...getRootProps()}
    >
      <input name={name} {...getInputProps()} />
      {base64
        ? (
          <div className='flex items-center justify-center'>
            <Image
              src={base64}
              height={100}
              width={100}
              alt='Uploaded Image'
              className={`object-cover max-w-full aspect-square ${className}`}
            />
          </div>
          )
        : (
          <p className='text-white flex justify-center items-center h-full'>{children}</p>
          )}
    </div>
  )
}
