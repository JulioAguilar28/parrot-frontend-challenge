import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/joy/Card'
import Loader from '@mui/joy/CircularProgress'
import useSWR from 'swr'

import { useCurrentUser } from '../../auth/store/useCurrentUser'
import * as StoresService from '../services/stores'

export const StoreList = () => {
  const { setUser } = useCurrentUser()
  const { data, isLoading } = useSWR('/api/v1/users/me', StoresService.getStoresRequest)

  useEffect(() => {
    if (!data) return

    setUser({ uuid: data.uuid, email: data.email, username: data.email })
  }, [data, setUser])

  if (isLoading) {
    return (
      <div className="min-h-dvh flex justify-center items-center">
        <Loader size="lg" color="danger" />
      </div>
    )
  }

  return (
    <section className="p-4 flex justify-center md:justify-normal flex-wrap">
      {data?.stores.map((store) => (
        <Card
          key={store.uuid}
          sx={{
            width: '100%',
            maxWidth: 280,
            height: 300,
            border: `1px solid ${store.config.brandColor}`,
            justifyContent: 'space-between'
          }}
        >
          <h4 className="flex flex-col items-center text-xl">{store.name}</h4>
          <Link
            style={{ backgroundColor: store.config.brandColor ?? '#FF0000' }}
            to={`${store.uuid}`}
            className={`flex justify-center text-white p-2 rounded-lg`}
          >
            Visitar
          </Link>
        </Card>
      ))}
    </section>
  )
}
