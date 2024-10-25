import { useParams } from 'react-router-dom'

export const StoreById = () => {
  const { id } = useParams()

  return <div>store by id: {id}</div>
}
