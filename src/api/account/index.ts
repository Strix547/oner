import { API } from 'core'

import { Me } from './types'

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
