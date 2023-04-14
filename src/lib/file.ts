export const readFileAsDataUrl = async (file: File): Promise<string | ArrayBuffer | null> => {
  return await new Promise((resolve, reject) => {
    const reader = new window.FileReader()

    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = function () {
      reject(reader.error)
    }

    reader.readAsDataURL(file)
  })
}
