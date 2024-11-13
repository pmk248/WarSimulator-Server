export type registerDTO = {
    username     : string,
    password     : string,
    organization : string,
    region       : string | null
}

export type loginDTO = {
    username : string,
    password : string
}
