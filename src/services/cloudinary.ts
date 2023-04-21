import { v2 as cloudinary } from 'cloudinary'



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export async function saveImageToCloudinary (image: string) {
  const { secure_url: imageUrl } = await cloudinary.uploader.upload(image, { upload_preset: 'twitter-clone' })

  return { imageUrl }
}
