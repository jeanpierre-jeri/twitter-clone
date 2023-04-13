import axios from 'redaxios'

export const fetcher = (url: string) => axios(url).then((res) => res.data)
