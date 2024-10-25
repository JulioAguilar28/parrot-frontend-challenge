import axios, { Axios } from 'axios'

import * as StorageService from './LocalStorage'
import { LoginResponse } from '../auth/service/auth'

// Should be an environment variable
const BASE_API = 'https://api-staging.parrot.rest'

/**
 * ParrotService
 *
 * Service that following Singleton pattern
 * to avoid having multiple instances
 */
export class ParrotService {
  #axios: Axios
  static #instance: ParrotService

  private constructor() {
    this.#axios = axios.create({
      baseURL: BASE_API
    })

    this.#axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
          // Avoid infinity loop marking this as retried
          originalRequest._retry = true

          try {
            const { refresh } = StorageService.getAccessAndRefreshTokens()
            const response = (
              await this.#axios.post<LoginResponse>('/api/auth/token/refresh', { refresh })
            ).data

            autheticateParrotService(response.access)
            StorageService.setAccessAndRefreshTokens(response.access, response.refresh)
            // Extra step to retry the origin request with the access updated
            originalRequest.defaults.headers.common.Authorization = `Bearer ${response.access}`

            //@ts-expect-error #axios instance with the origin request
            return this.#axios(originalRequest)
          } catch (reason) {
            console.error(reason)

            StorageService.clearAccessAndRefreshTokens()
            // window.location.href = '/parrot/login'
            return Promise.reject(reason)
          }
        }

        return Promise.reject(error)
      }
    )
  }

  public static of() {
    if (this.#instance == null) this.#instance = new ParrotService()

    return this.#instance.#axios
  }
}

export const autheticateParrotService = (token: string) => {
  ParrotService.of().defaults.headers.common.Authorization = `Bearer ${token}`
  return token
}
