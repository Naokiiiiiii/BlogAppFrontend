import { paths } from 'types/api'
import { ArticleTags, baseApi } from '../baseApi'

type PutCommentParams = paths['/comment']['post']['requestBody']['content']['application/json']
type PutCommentResponse = paths['/comment']['post']['responses']['200']['content']['application/json']

export const commentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    putComment: builder.query<PutCommentResponse, PutCommentParams>({
      query: (params) => ({
        url: 'comment',
        method: 'POST',
        body: {
          article_id: params.article_id,
          user_id: params.user_id,
          message: params.message,
        },
      }),
      providesTags: [ArticleTags.CreateArticle, ArticleTags.DeleteArticle],
    }),
  }),
})

export const {} = commentsApi
