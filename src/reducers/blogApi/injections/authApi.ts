import { paths } from 'types/api'
import { baseApi } from '../baseApi'

type SignInParams = paths['/token']['get']['requestBody']['content']['application/json']

type SignInResponse = paths['/token']['get']['responses']['200']['content']['application/json']

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    token: builder.mutation<SignInResponse, SignInParams>({
      query: (params) => ({
        url: 'token',
        method: 'POST',
        body: {
          code: params.code,
        },
      }),
    }),
  }),
})

export const { useTokenMutation } = authApi
