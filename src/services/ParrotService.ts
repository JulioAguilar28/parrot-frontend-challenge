import axios, { Axios } from 'axios'

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
