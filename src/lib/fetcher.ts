import axios from 'redaxios'



export const fetcher = async (url: string) => axios(url).then(res => res.data)
