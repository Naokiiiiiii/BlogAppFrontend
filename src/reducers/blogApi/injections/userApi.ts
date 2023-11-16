import { paths } from 'types/api'
import { baseApi } from '../baseApi'

type SignInParams = paths['/token']['get']['requestBody']['content']['application/json']

type SignInResponse = paths['/token']['get']['responses']['200']['content']['application/json']

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInParams>({
      query: (params) => ({
        url: 'public/users/sign_in',
        method: 'POST',
        body: {
          code: params.code,
        },
      }),
    }),
  }),
})

export const { useSignInMutation } = userApi
