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
