import { paths } from 'types/api'
import { baseApi, NiceTag } from '../baseApi'

type PostNiceParams = paths['/nice']['post']['requestBody']['content']['application/json']
type PostNiceResponse = paths['/nice']['post']['responses']['200']['content']['application/json']

export const niceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postNice: builder.mutation<PostNiceResponse, PostNiceParams>({
      query: (params) => ({
        url: 'article/nice',
        method: 'POST',
        body: {
          article_id: params.article_id,
          user_id: params.user_id,
        },
      }),
      invalidatesTags: [NiceTag.PostNice],
    }),
  }),
})

export const { usePostNiceMutation } = niceApi
