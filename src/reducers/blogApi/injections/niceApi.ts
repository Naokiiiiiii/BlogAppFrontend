import { paths } from 'types/api'
import { baseApi, KeysToCamelcase, NiceTags } from '../baseApi'

type PostNiceParams = KeysToCamelcase<paths['/nice']['post']['requestBody']['content']['application/json']>
type PostNiceResponse = KeysToCamelcase<paths['/nice']['post']['responses']['200']['content']['application/json']>

export const niceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postNice: builder.mutation<PostNiceResponse, PostNiceParams>({
      query: (params) => ({
        url: 'article/nice',
        method: 'POST',
        body: {
          article_id: params.articleId,
          user_id: params.userId,
        },
      }),
      invalidatesTags: [NiceTags.PostNice],
    }),
  }),
})

export const { usePostNiceMutation } = niceApi
