import { API } from 'core'

import { Me, ChangeMeReq } from './types'

const root = '/account'

const transformMe = (me: Me) => {
  const {
    id,
    phone,
    email,
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName
  } = me

  return {
    id,
    phone,
    email,
    firstName,
    middleName,
    lastName
  }
}

export const fetchMe = async () => {
  const { data: me } = await API.get<Me>(`${root}/me`)
  return transformMe(me)
}

export const changeMe = async ({ firstName, middleName, lastName, phone }: ChangeMeReq) => {
  const { data: me } = await API.put(`${root}/me/`, {
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    phone
  })
  return transformMe(me)
}
