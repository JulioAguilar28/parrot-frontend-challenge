import { useImmer } from 'use-immer'
import FormControl from '@mui/joy/FormControl'
import FormHelperText from '@mui/joy/FormHelperText'
import Alert from '@mui/joy/Alert'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import { FaEnvelopeOpen, FaKey } from 'react-icons/fa'

import * as AuthService from './service/auth'
import { validatePassword, validateUsername } from './schemas/login'
import { parseAuthReason } from './service/authErrors'
import { setAccessAndRefreshTokens } from '../services/LocalStorage'

type LoginPageState = {
  loading: boolean
  error: string
  username: { value: string; error: string }
  password: { value: string; error: string }
}

export const LoginPage = () => {
  const [state, setState] = useImmer<LoginPageState>({
    loading: false,
    error: '',
    username: { value: '', error: '' },
    password: { value: '', error: '' }
  })

  // Computed properties
  const disableLoginButton =
    state.username.error !== '' ||
    state.username.value === '' ||
    state.password.error !== '' ||
    state.password.value === ''

  const handleChangeUsername = (value: string) => {
    setState((draft) => void (draft.username.value = value))
  }

  const handleValidateUsername = () => {
    const error = validateUsername(state.username.value)
    setState((draft) => void (draft.username.error = error ?? ''))
  }

  const handleChangePassword = (value: string) => {
    setState((draft) => void (draft.password.value = value))

    const error = validatePassword(value)
    setState((draft) => void (draft.password.error = error ?? ''))
  }

  const handleLogin = async () => {
    try {
      setState((draft) => {
        draft.loading = true
        draft.error = ''
      })
      const { access, refresh } = await AuthService.login({
        username: state.username.value,
        password: state.password.value
      })

      setAccessAndRefreshTokens(access, refresh)
    } catch (reason) {
      // @ts-expect-error reason.response is the response of the server
      const error = parseAuthReason(reason.response.data)
      setState((draft) => void (draft.error = error.message))
    } finally {
      setState((draft) => void (draft.loading = false))
    }
  }

  return (
    <main className="min-h-dvh p-3 md:p-16 flex items-center justify-center">
      <section className="px-4 md:px-8 py-8 shadow-sm shadow-gray-300 rounded-3xl flex flex-col gap-y-10 w-full max-w-lg border border-gray-300">
        <img
          src="https://parrotsoftware.com.mx/hs-fs/hubfs/parrotlogo.png?width=132&height=50&name=parrotlogo.png"
          alt="parrot logo"
          width={120}
          height={'auto'}
          className="self-center"
        />

        <form className="flex flex-col gap-y-5 w-100">
          {state.error && <Alert color="danger">{state.error}</Alert>}

          <FormControl error={!!state.username.error || !!state.error}>
            <Input
              startDecorator={<FaEnvelopeOpen />}
              type="text"
              placeholder="Username"
              value={state.username.value}
              onChange={(event) => handleChangeUsername(event.currentTarget.value)}
              onBlur={() => handleValidateUsername()}
            />

            {!!state.username.error && <FormHelperText>{state.username.error}</FormHelperText>}
          </FormControl>

          <FormControl error={!!state.error}>
            <Input
              placeholder="Password"
              startDecorator={<FaKey />}
              type="password"
              value={state.password.value}
              onChange={(event) => handleChangePassword(event.currentTarget.value)}
            />
          </FormControl>

          <Button
            disabled={disableLoginButton}
            loading={state.loading}
            color="danger"
            onClick={handleLogin}
          >
            Log In
          </Button>
        </form>
      </section>
    </main>
  )
}
