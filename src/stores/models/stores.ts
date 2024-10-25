export interface StoresResponse {
  uuid: string
  email: string
  stores: Store[]
  username: string
}

export interface Store {
  uuid: string
  name: string
  availabilityState: string
  providers: string[]
  config: Config
  secret: string
  legacyId: string
  organizationUuid: string
}

export interface Config {
  brandColor: string
}
