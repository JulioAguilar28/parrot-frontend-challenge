import { useParams } from 'react-router-dom'
import useSWR from 'swr'

import * as StoresService from '../services/stores'

export const StoreById = () => {
  const { id } = useParams()

  const { data: products } = useSWR('/api/v1/products/', (endpoint) =>
    StoresService.getStoreByIdRequest(endpoint, id!)
  )

  return (
    <main className="min-h-dvh">
      <header>
        <h2>{}</h2>
      </header>
    </main>
  )
}
