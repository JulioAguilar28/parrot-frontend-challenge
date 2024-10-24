import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import { FaEnvelopeOpen, FaKey } from 'react-icons/fa'

export const LoginPage = () => {
  return (
    <main className="min-h-dvh p-16 flex items-center justify-center">
      <section className="p-8 shadow-sm shadow-gray-300 rounded-3xl flex flex-col gap-y-10 w-full border border-gray-300">
        <img
          src="https://parrotsoftware.com.mx/hs-fs/hubfs/parrotlogo.png?width=132&height=50&name=parrotlogo.png"
          alt="parrot logo"
          width={120}
          height={'auto'}
          className="self-center"
        />

        <form className="flex flex-col gap-y-5 w-100">
          <Input
            startDecorator={<FaEnvelopeOpen />}
            type="text"
            placeholder="Username"
            className="hover:outline-primary active:outline-primary focus:outline-primary"
          />
          <Input placeholder="Password" startDecorator={<FaKey />} type="password" />

          <Button color="danger">Log In</Button>
        </form>
      </section>
    </main>
  )
}
