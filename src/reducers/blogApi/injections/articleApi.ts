import { paths } from 'types/api'
import { ArticleTags, baseApi, CommentTag, KeysToCamelcase, NiceTag } from '../baseApi'

type GetArticleListParams = paths['/article/list']['get']['parameters']['query']
type GetArticleListResponse = paths['/article/list']['get']['responses']['200']['content']['application/json']
type GetArticleDetailParams = KeysToCamelcase<paths['/article/{article_id}']['get']['parameters']['path']>
type GetArticleDetailResponse = paths['/article/{article_id}']['get']['responses']['200']['content']['application/json']
type PostArticleParams = KeysToCamelcase<paths['/article']['post']['requestBody']['content']['application/json']>
type PostArticleResponse = KeysToCamelcase<paths['/article']['post']['responses']['200']['content']['application/json']>
type DeleteArticleParams = KeysToCamelcase<paths['/article/{article_id}']['delete']['parameters']['path']>
type DeleteArticleResponse = paths['/article/{article_id}']['delete']['responses']['200']['content']['application/json']

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<GetArticleListResponse, GetArticleListParams>({
      query: (params) => ({
        url: 'article/list',
        method: 'GET',
        params: { page: params?.page },
      }),
      providesTags: [ArticleTags.CreateArticle, ArticleTags.DeleteArticle],
    }),
    getArticleDetail: builder.query<GetArticleDetailResponse, GetArticleDetailParams>({
      query: (params) => ({
        url: `article/${params.articleId}`,
        method: 'GET',
      }),
      providesTags: [CommentTag.CreateComment, CommentTag.DeleteComment, CommentTag.UpdateComment, NiceTag.PostNice],
    }),
    createArticle: builder.mutation<PostArticleResponse, PostArticleParams>({
      query: (params) => ({
        url: 'article',
        method: 'POST',
        body: {
          title: params.title,
          contents: params.contents,
          user_id: params.userId,
        },
      }),
      invalidatesTags: [ArticleTags.CreateArticle],
    }),
    deleteArticle: builder.mutation<DeleteArticleResponse, DeleteArticleParams>({
      query: (params) => ({
        url: `article/${params.articleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ArticleTags.DeleteArticle],
    }),
  }),
})

export const { useGetArticlesQuery, useGetArticleDetailQuery, useCreateArticleMutation, useDeleteArticleMutation } = articlesApi
