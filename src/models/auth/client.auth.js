// @flow

type ClientObj = {
  id: string, 
  redirectUris: ?string[], 
  grants: string[], 
  accessTokenLifetime: ?number, 
  refreshTokenLifetime: ?number
}