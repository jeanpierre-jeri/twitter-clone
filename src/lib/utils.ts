import axios from 'redaxios'



export async function addFollow (userId: string) {
  const { data } = await axios.post(`/api/users/${userId}/follow`)

  return data
}

export async function removeFollow (userId: string) {
  const { data } = await axios.delete(`/api/users/${userId}/follow`)

  return data
}

export async function addLike (postId: string) {
  const { data } = await axios.post(`/api/posts/${postId}/like`)

  return data
}


export async function removeLike (postId: string) {
  const { data } = await axios.delete(`/api/posts/${postId}/like`)

  return data
}
