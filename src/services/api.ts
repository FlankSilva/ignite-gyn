/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { AppError } from '@utils/AppError'

type RequestSetAPIProps = {
  endpoint: string
  data?: any
  setIsLoading?: (status: boolean) => void
}

type RequestGetAPIProps = {
  endpoint: string
  setIsLoading?: (status: boolean) => void
}

export const api = axios.create({
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
}: RequestSetAPIProps) {
  try {
    const response = await api.post(endpoint, data)

    return response.data
  } catch (error) {
    const isAppError = error instanceof AppError

    console.log(error)

    const title = isAppError
      ? error.message
      : 'Não foi possível criar a conta. Tente novamente mais tarde'

    if (setIsLoading) {
      setIsLoading(false)
    }

    return title
  }
}

export async function getDataAPI({
  endpoint,
  setIsLoading,
}: RequestGetAPIProps) {
  try {
    const response = await api.get(endpoint)

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
