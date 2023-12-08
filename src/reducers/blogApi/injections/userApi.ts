import { paths } from 'types/api'
import { baseApi } from '../baseApi'

type GetUserInfoParams = {}
type GetUserInfoResponse = paths['/user']['get']['responses']['200']['content']['application/json']
type UpdateUserNameParams = paths['/user/{user_id}']['put']['parameters']['path'] &
  paths['/user/{user_id}']['put']['requestBody']['content']['application/json']
type UpdateUserNameResponse = paths['/user/{user_id}']['put']['responses']['200']['content']

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<GetUserInfoResponse, GetUserInfoParams>({
      query: () => ({
        url: 'user',
      }),
    }),
    updateUserName: builder.mutation<UpdateUserNameResponse, UpdateUserNameParams>({
      query: (params) => ({
        url: `user/${params.user_id}`,
        method: 'PUT',
        body: {
          user_name: params.user_name,
        },
      }),
    }),
  }),
})

export const { useUpdateUserNameMutation } = usersApi
