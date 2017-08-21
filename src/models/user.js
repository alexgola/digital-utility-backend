
// @flow

declare type UserRegistrationRequest = {
    username: string, 
    password: string, 
    salt: string, 
    email: string,
    grants: string[],
    creationTimestamp: any
}

declare type RequestUser = {
    id: string, 
    username: string, 
    email: string, 
    roles: string[],
    grants: string[],
}

declare type UserMeResponse = {
    id: string, 
    username: string, 
    email: string, 
    roles: string[],
    grants: string[]
}

