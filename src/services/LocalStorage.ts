enum LocalStorageKeys {
  Access = 'access',
  Refresh = 'refresh'
}

export const setAccessAndRefreshTokens = (access: string, refresh: string) => {
  localStorage.setItem(LocalStorageKeys.Access, access)
  localStorage.setItem(LocalStorageKeys.Refresh, refresh)
}

export const getAccessAndRefreshTokens = () => {
  return {
    access: localStorage.getItem(LocalStorageKeys.Access),
    refresh: localStorage.getItem(LocalStorageKeys.Refresh)
  }
}

export const clearAccessAndRefreshTokens = () => {
  localStorage.removeItem(LocalStorageKeys.Access)
  localStorage.removeItem(LocalStorageKeys.Refresh)
}
