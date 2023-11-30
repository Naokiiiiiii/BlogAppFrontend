import { paths } from 'types/api'
import { baseApi } from '../baseApi'

type GetUserInfoParams = {}
type GetUserInfoResponse = paths['/user']['get']['responses']['200']['content']['application/json']

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<GetUserInfoResponse, GetUserInfoParams>({
      query: () => ({
        url: 'user',
      }),
    }),
  }),
})
