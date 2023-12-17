import { paths } from 'types/api'
import { baseApi, CommentTag, KeysToCamelcase } from '../baseApi'

type CreateCommentParams = KeysToCamelcase<paths['/comment']['post']['requestBody']['content']['application/json']>
type CreateCommentResponse = KeysToCamelcase<paths['/comment']['post']['responses']['200']['content']['application/json']>
type DeleteCommentParams = KeysToCamelcase<paths['/comment/{comment_id}']['delete']['parameters']['path']>
type DeleteCommentResponse = paths['/comment/{comment_id}']['delete']['responses']['200']['content']['application/json']
type UpdateCommentParams = KeysToCamelcase<
  paths['/comment/{comment_id}']['put']['parameters']['path'] & paths['/comment/{comment_id}']['put']['requestBody']['content']['application/json']
>
type UpdateCommentResponse = paths['/comment/{comment_id}']['put']['responses']['200']['content']['application/json']

export const commentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<CreateCommentResponse, CreateCommentParams>({
      query: (params) => ({
        url: 'comment',
        method: 'POST',
        body: {
          article_id: params.articleId,
          user_id: params.userId,
          message: params.message,
        },
      }),
      invalidatesTags: [CommentTag.CreateComment],
    }),
    deleteComment: builder.mutation<DeleteCommentResponse, DeleteCommentParams>({
      query: (params) => ({
        url: `comment/${params.commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [CommentTag.DeleteComment],
    }),
    updateComment: builder.mutation<UpdateCommentResponse, UpdateCommentParams>({
      query: (params) => ({
        url: `comment/${params.commentId}`,
        method: 'PUT',
        body: {
          message: params.message,
        },
      }),
      invalidatesTags: [CommentTag.UpdateComment],
    }),
  }),
})

export const { useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } = commentsApi
