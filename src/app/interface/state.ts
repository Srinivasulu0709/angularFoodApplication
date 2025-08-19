export interface State {
    name:String,
    state_code:string
}

export interface country {
    name:String,
    iso2:String,
    iso3:String,
    states:State[]
}
