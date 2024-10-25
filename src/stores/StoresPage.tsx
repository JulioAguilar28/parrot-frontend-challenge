import { useEffect, useState } from 'react'
import Card from '@mui/joy/Card'
import { Link } from 'react-router-dom'

import * as StoresService from './services/stores'
import { useCurrentUser } from '../auth/store/useCurrentUser'
import { Store } from './models/stores'

export const StoresPage = () => {
  const { setUser } = useCurrentUser()
  const [stores, setStores] = useState<Store[]>([])

  useEffect(() => {
    const handleGetStores = async () => {
      const response = await StoresService.getStores()

      setStores(response.stores)
      setUser({ uuid: response.uuid, email: response.email, username: response.username })
    }

    handleGetStores().catch((reason) => {
      console.error(reason)
    })
  }, [setUser])

  if (stores.length === 0) {
    return <div>You dont have stores</div>
  }

  return (
    <main className="min-h-dvh flex flex-col gap-y-5">
      <header className="bg-primary shadow-md shadow-slate-300 text-white h-16 flex items-center px-4">
        <h2 className="text-2xl">My Stores</h2>
      </header>

      <section className="px-4 flex flex-wrap gap-3">
        {stores.map((store) => (
          <Card
            key={store.uuid}
            sx={{
              width: 248,
              height: 300,
              border: `1px solid ${store.config.brandColor}`,
              justifyContent: 'space-between'
            }}
          >
            <h4 className="flex flex-col items-center text-xl">{store.name}</h4>
            <Link
              to={`${store.uuid}`}
              className={`bg-[${store.config.brandColor}] hover:bg-[${store.config.brandColor}]/75 flex justify-center text-white p-2 rounded-lg`}
            >
              Visitar
            </Link>
          </Card>
        ))}
      </section>
    </main>
  )
}
