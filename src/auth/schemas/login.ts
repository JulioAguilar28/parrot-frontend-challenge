import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(3).email(),
  password: z.string().min(3)
})

export const validateLogin = (object: object) => {
  return loginSchema.safeParse(object)
}
