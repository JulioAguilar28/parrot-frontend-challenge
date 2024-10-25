import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { CircularProgress as Loader } from '@mui/joy'

import { ProductsByCategoryList } from '../components/ProductsByCategoryList'
import * as StoresService from '../services/stores'
import { ProductsByCategory } from '../models/products'

export const StoreById = () => {
  const { id } = useParams()

  const { data: products, isLoading } = useSWR('/api/v1/products/', (endpoint) =>
    StoresService.getStoreByIdRequest(endpoint, id!)
  )

  const productsByCategory = useMemo<ProductsByCategory>(() => {
    if (!products) return {}

    return products!.reduce((acc, current) => {
      ;(acc[current.category.name] ??= []).push(current)

      return acc
    }, {} as ProductsByCategory)
  }, [products])

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <Loader color="danger" />
      </div>
    )
  }

  return (
    <section>
      <ProductsByCategoryList productsByCategory={productsByCategory} />
    </section>
  )
}
