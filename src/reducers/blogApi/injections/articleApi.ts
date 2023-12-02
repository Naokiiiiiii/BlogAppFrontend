import { paths } from 'types/api'
import { baseApi } from '../baseApi'

type GetArticleListParams = paths['/article/list']['get']['parameters']['query']
type GetArticleListResponse = paths['/article/list']['get']['responses']['200']['content']['application/json']

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<GetArticleListResponse, GetArticleListParams>({
      query: (params) => ({
        url: 'article/list',
        params: { page: params?.page ?? 10 },
      }),
    }),
  }),
})

export const { useGetArticlesQuery } = articlesApi
