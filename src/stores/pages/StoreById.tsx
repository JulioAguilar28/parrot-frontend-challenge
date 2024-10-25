import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import {
  AccordionGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  CircularProgress as Loader
} from '@mui/joy'

import * as StoresService from '../services/stores'
import { Product } from '../models/products'

export const StoreById = () => {
  const { id } = useParams()

  const { data: products, isLoading } = useSWR('/api/v1/products/', (endpoint) =>
    StoresService.getStoreByIdRequest(endpoint, id!)
  )

  const productsByCategory = useMemo(() => {
    return products?.reduce((acc, current) => {
      ;(acc[current.category.name] ??= []).push(current)

      return acc
    }, {})
  }, [products]) as { name: string; products: Product[] }

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <Loader color="danger" />
      </div>
    )
  }

  return (
    <section>
      <AccordionGroup>
        {Object.entries(productsByCategory).map(([name, products]) => (
          <Accordion key={name}>
            <AccordionSummary>
              {name} ({products.length})
            </AccordionSummary>

            {(products as Product[]).map((product) => (
              <AccordionDetails key={product.uuid}>
                <div className="flex flex-col md:flex-row gap-y-2 p-4 md:justify-between shadow-md shadow-slate-200">
                  <div className="flex gap-x-2">
                    <img className="w-28 h-full" src={product.imageUrl} alt={product.name} />
                    <div className="flex flex-col gap-y-1 justify-center">
                      <span>{product.name}</span>
                      <span>${product.price}</span>
                    </div>
                  </div>

                  <div className="flex md:flex-col md:items-center md:justify-center justify-between gap-y-2">
                    <span>
                      {product.availability === 'AVAILABLE' ? 'Disponible' : 'No disponible'}
                    </span>
                    <Switch
                      checked={product.availability === 'AVAILABLE'}
                      color={product.availability === 'AVAILABLE' ? 'danger' : 'neutral'}
                    />
                  </div>
                </div>
              </AccordionDetails>
            ))}
          </Accordion>
        ))}
      </AccordionGroup>
    </section>
  )
}
