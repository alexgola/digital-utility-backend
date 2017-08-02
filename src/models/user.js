
// @flow

declare type UserRegistrationRequest = {
    username: String, 
    password: String, 
    salt: String, 
    email: String, 
    creationTimestamp: any
}