import { AccordionGroup, Accordion, AccordionSummary } from '@mui/joy'

import { Product, ProductsByCategory } from '../models/products'
import { ProductItem } from './ProductItem'

type ProductListProps = {
  productsByCategory: ProductsByCategory
  onChangeAvailability: (productId: string, availability: Product['availability']) => void
}

export const ProductsByCategoryList = ({
  productsByCategory,
  onChangeAvailability
}: ProductListProps) => {
  return (
    <AccordionGroup>
      {Object.entries(productsByCategory).map(([category, products]) => (
        <Accordion key={category}>
          <AccordionSummary>
            {category} ({products.length})
          </AccordionSummary>

          {(products as Product[]).map((product) => (
            <ProductItem
              key={product.uuid}
              product={product}
              onChangeAvailability={onChangeAvailability}
            />
          ))}
        </Accordion>
      ))}
    </AccordionGroup>
  )
}
