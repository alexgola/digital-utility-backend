// @flow

type AccessToken = {
  expires: Date, 
  user: mixed,
}

type RefreshToken = {
  clientId: string,
  expires: Date, 
  userId: string,
}
