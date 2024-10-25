import { AccordionDetails, Switch } from '@mui/joy'

import { Product } from '../models/products'

interface ProductItemProps {
  product: Product
  onChangeAvailability: (productId: string, availability: Product['availability']) => void
}

export const ProductItem = ({ product, onChangeAvailability }: ProductItemProps) => {
  const isAvailable = product.availability === 'AVAILABLE'

  const handleOnChangeAvailability = (checked: boolean) => {
    const isAvailable = checked ? 'AVAILABLE' : 'UNAVAILABLE'

    onChangeAvailability(product.uuid, isAvailable)
  }

  return (
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
          <span className="px-4">{isAvailable ? 'Disponible' : 'No disponible'}</span>
          <Switch
            checked={isAvailable}
            color={isAvailable ? 'danger' : 'neutral'}
            onChange={(event) => handleOnChangeAvailability(event.currentTarget.checked)}
          />
        </div>
      </div>
    </AccordionDetails>
  )
}
