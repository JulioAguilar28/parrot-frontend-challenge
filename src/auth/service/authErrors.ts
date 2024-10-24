type ApiError = {
  code: string
  message: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseAuthReason = (reason: any) => {
  const error = reason as { errors: ApiError[] }

  return error.errors[0]
}
