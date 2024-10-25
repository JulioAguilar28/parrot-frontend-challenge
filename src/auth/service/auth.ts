import { autheticateParrotService, ParrotService } from '../../services/ParrotService'
import * as StorageService from '../../services/LocalStorage'

type LoginCredentials = { username: string; password: string }
type LoginResponse = { refresh: string; access: string }
type ValidateCurrentUserResponse = { status: string }

enum CurrentUserStatus {
  LoggedIn = 'ok'
}

const loginRequest = (credentials: LoginCredentials) =>
  ParrotService.of().post<LoginResponse>('/api/auth/token', credentials)

export const login = async (credentials: LoginCredentials) => {
  const response = await loginRequest(credentials)
  return response.data
}

const validateCurrentUserRequest = () =>
  ParrotService.of().get<ValidateCurrentUserResponse>('/api/auth/token/test')

export const validateCurrentUser = async (): Promise<{ isLoggedIn: boolean }> => {
  const { access } = StorageService.getAccessAndRefreshTokens()
  if (!access) throw new Error('AuthService: Authentication credentials were not provided.')

  autheticateParrotService(access)
  const response = await validateCurrentUserRequest()

  return {
    isLoggedIn: response.data.status === CurrentUserStatus.LoggedIn
  }
}
