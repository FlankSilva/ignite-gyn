/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { AppError } from '@utils/AppError'

type RequestAPIProps = {
  endpoint: string
  data?: any
  setIsLoading?: (status: boolean) => void
}

const api = axios.create({
  baseURL: 'http://192.168.1.226:3333',
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(error)
    }
  },
)

export async function setDataAPI({
  endpoint,
  data,
  setIsLoading,
}: RequestAPIProps) {
  try {
    const response = await api.post(endpoint, data)

    return response.data
  } catch (error) {
    const isAppError = error instanceof AppError

    const title = isAppError
      ? error.message
      : 'Não foi possível criar a conta. Tente novamente mais tarde'

    if (setIsLoading) {
      setIsLoading(false)
    }

    return title
  }
}

export async function getDataAPI(endpoint: string) {
  try {
    const response = await api.get(endpoint)

    return response
  } catch (error) {
    const isAppError = error instanceof AppError

    const title = isAppError
      ? error.message
      : 'Não foi possível criar a conta. Tente novamente mais tarde'

    return title
  }
}
