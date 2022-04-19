import { useQuery } from 'react-query'

import { accountAPI } from 'api'

export const useMe = () => {
  return useQuery('me', accountAPI.fetchMe)
}
