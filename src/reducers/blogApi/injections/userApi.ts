import { paths } from 'types/api'
import { baseApi, KeysToCamelcase, UserTag } from '../baseApi'

type GetUserInfoParams = {}
type GetUserInfoResponse = paths['/user']['get']['responses']['200']['content']['application/json']
type UpdateUserNameParams = KeysToCamelcase<
  paths['/user/{user_id}']['put']['parameters']['path'] & paths['/user/{user_id}']['put']['requestBody']['content']['application/json']
>
type UpdateUserNameResponse = paths['/user/{user_id}']['put']['responses']['200']['content']['application/json']

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<GetUserInfoResponse, GetUserInfoParams>({
      query: () => ({
        url: 'user',
      }),
      providesTags: [UserTag.UpdateUser],
    }),
    updateUserName: builder.mutation<UpdateUserNameResponse, UpdateUserNameParams>({
      query: (params) => ({
        url: `user/${params.userId}`,
        method: 'PUT',
        body: {
          user_name: params.userName,
        },
      }),
      invalidatesTags: [UserTag.UpdateUser],
    }),
  }),
})

export const { useUpdateUserNameMutation } = usersApi
