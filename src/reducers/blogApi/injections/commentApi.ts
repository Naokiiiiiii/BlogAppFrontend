import { paths } from 'types/api'
import { baseApi, CommentTag } from '../baseApi'

type CreateCommentParams = paths['/comment']['post']['requestBody']['content']['application/json']
type CreateCommentResponse = paths['/comment']['post']['responses']['200']['content']['application/json']
type DeleteCommentParams = paths['/comment/{comment_id}']['delete']['parameters']['path']
type DeleteCommentResponse = paths['/comment/{comment_id}']['delete']['responses']['200']['content']['application/json']
type UpdateCommentParams = paths['/comment/{comment_id}']['put']['parameters']['path'] &
  paths['/comment/{comment_id}']['put']['requestBody']['content']['application/json']
type UpdateCommentResponse = paths['/comment/{comment_id}']['put']['responses']['200']['content']

export const commentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<CreateCommentResponse, CreateCommentParams>({
      query: (params) => ({
        url: 'comment',
        method: 'POST',
        body: {
          article_id: params.article_id,
          user_id: params.user_id,
          message: params.message,
        },
      }),
      invalidatesTags: [CommentTag.CreateComment],
    }),
    deleteComment: builder.mutation<DeleteCommentResponse, DeleteCommentParams>({
      query: (params) => ({
        url: `comment/${params.comment_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [CommentTag.DeleteComment],
    }),
    updateComment: builder.mutation<UpdateCommentResponse, UpdateCommentParams>({
      query: (params) => ({
        url: `comment/${params.comment_id}`,
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
