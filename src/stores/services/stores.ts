import { ParrotService } from '../../services/ParrotService'
import { Product } from '../models/products'
import { StoresResponse } from '../models/stores'

export const getStoresRequest = (endpoint: string) =>
  ParrotService.of()
    .get<{ result: StoresResponse }>(endpoint)
    .then((res) => res.data.result)

export const getStoreByIdRequest = (endpoint: string, id: string) =>
  ParrotService.of()
    .get<{ results: Product[] }>(endpoint, { params: { store: id } })
    .then((res) => res.data.results)

export const updateProductAvailability = (
  _endpoint: string,
  {
    arg
  }: {
    arg: { productId: string; availability: Product['availability'] }
  }
) =>
  ParrotService.of()
    .put<{ result: Product }>(`/api/v1/products/${arg.productId}/availability`, {
      availability: arg.availability
    })
    .then((res) => res.data.result)
