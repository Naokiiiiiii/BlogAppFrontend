import { paths } from 'types/api'
import { baseApi } from '../baseApi'

type GetUserInfoResponse = paths['/user']['get']['responses']

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<'', GetUserInfoResponse>({
      query: () => ({
        url: `user`,
      }),
    }),
  }),
})
