import { AccordionGroup, Accordion, AccordionSummary, AccordionDetails, Switch } from '@mui/joy'

import { Product, ProductsByCategory } from '../models/products'

type ProductListProps = {
  productsByCategory: ProductsByCategory
}

export const ProductsByCategoryList = ({ productsByCategory }: ProductListProps) => {
  const isProductAvailable = (availability: Product['availability']) => {
    return availability === 'AVAILABLE'
  }

  return (
    <AccordionGroup>
      {Object.entries(productsByCategory).map(([category, products]) => (
        <Accordion key={category}>
          <AccordionSummary>
            {category} ({products.length})
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
                    {isProductAvailable(product.availability) ? 'Disponible' : 'No disponible'}
                  </span>
                  <Switch
                    checked={isProductAvailable(product.availability)}
                    color={isProductAvailable(product.availability) ? 'danger' : 'neutral'}
                  />
                </div>
              </div>
            </AccordionDetails>
          ))}
        </Accordion>
      ))}
    </AccordionGroup>
  )
}
