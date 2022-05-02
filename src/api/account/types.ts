export interface Me {
  id: number
  first_name: string
  middle_name: string
  last_name: string
  phone: string
  email: string
}

export interface ChangeMeReq {
  firstName: string
  middleName: string
  lastName: string
  phone: string
}
