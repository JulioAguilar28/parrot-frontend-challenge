import { ParrotService } from '../../services/ParrotService'

type LoginCredentials = { username: string; password: string }
type LoginResponse = { refresh: string; access: string }

const loginRequest = (credentials: LoginCredentials) =>
  ParrotService.of().post<LoginResponse>('/api/auth/token', credentials)

export const login = async (credentials: LoginCredentials) => {
  const response = await loginRequest(credentials)
  return response.data
}
