import { z } from 'zod'

const username = z
  .string()
  .min(3, { message: 'Invalid username' })
  .email({ message: 'Invalid username' })

const password = z.string().min(1, { message: 'Invalid password' })

export const validateUsername = (value: string) => {
  const response = username.safeParse(value)

  if (response.success) return

  return response.error.errors[0].message
}

export const validatePassword = (value: string) => {
  const response = password.safeParse(value)

  if (response.success) return

  return response.error.errors[0].message
}
