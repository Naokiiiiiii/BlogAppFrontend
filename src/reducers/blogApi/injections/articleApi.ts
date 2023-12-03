import { paths } from 'types/api'
import { baseApi } from '../baseApi'

type GetArticleListParams = paths['/article/list']['get']['parameters']['query']
type GetArticleListResponse = paths['/article/list']['get']['responses']['200']['content']['application/json']
type GetArticleDetailParams = paths['/article/{article_id}']['get']['parameters']['path']
type GetArticleDetailResponse = paths['/article/{article_id}']['get']['responses']['200']['content']['application/json']

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<GetArticleListResponse, GetArticleListParams>({
      query: (params) => ({
        url: 'article/list',
        method: 'GET',
        params: { page: params?.page },
      }),
    }),
    getArticleDetail: builder.query<GetArticleDetailResponse, GetArticleDetailParams>({
      query: (params) => ({
        url: `article/${params.article_id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetArticlesQuery, useGetArticleDetailQuery } = articlesApi
