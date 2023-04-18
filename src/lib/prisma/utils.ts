import axios from 'redaxios'



export async function addFollow (userId: string) {
  const { data } = await axios.post(`/api/users/${userId}/follow`)

  return data
}

export async function removeFollow (userId: string) {
  const { data } = await axios.delete(`/api/users/${userId}/follow`)

  return data
}
