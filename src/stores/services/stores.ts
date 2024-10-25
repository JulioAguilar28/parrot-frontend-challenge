import { ParrotService } from '../../services/ParrotService'
import { StoresResponse } from '../models/stores'

const getStoresRequest = () =>
  ParrotService.of().get<{ result: StoresResponse }>('/api/v1/users/me')

export const getStores = async () => {
  const response = await getStoresRequest()

  return response.data.result
}
