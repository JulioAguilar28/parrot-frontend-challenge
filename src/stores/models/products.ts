export interface Product {
  uuid: string
  name: string
  description: string
  imageUrl: string
  legacyId: string
  price: string
  alcoholCount: number
  soldAlone: boolean
  availability: 'UNAVAILABLE' | 'AVAILABLE'
  providerAvailability: string[]
  category: Category
  barcode: string
}

export interface Category {
  uuid: string
  name: string
  sortPosition: number
}
