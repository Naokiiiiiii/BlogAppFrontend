import { yupResolver } from '@hookform/resolvers/yup'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useGetArticleDetailQuery } from '@reducers/blogApi/injections/articleApi'
import { useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } from '@reducers/blogApi/injections/commentApi'
import { usePostNiceMutation } from '@reducers/blogApi/injections/niceApi'
import { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'store'
import { InferType, object, string } from 'yup'

const createCommentSchema = object({
  messageCreate: string().required('コメントを入力してください'),
})

const editCommentSchema = object({
  messageEdit: string().required('コメントを入力してください'),
})

type CreateCommentFormData = InferType<typeof createCommentSchema>
type EditCommentFormData = InferType<typeof editCommentSchema>

export const ArticleDetail: FC = () => {
  const { id } = useParams()
  const { data: article, isLoading } = useGetArticleDetailQuery({ articleId: parseInt(id ?? '') })
  const { user } = useAppSelector((state) => state.Auth)
  const [createComment] = useCreateCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()
  const [updateComment] = useUpdateCommentMutation()
  const [updateNice] = usePostNiceMutation()
  const [isCommentEdit, setIsCommentEdit] = useState(false)
  const [editCommentID, setEditCommentID] = useState(0)

  const {
    control: createCommentControl,
    handleSubmit: createCommentHandleSubmit,
    formState: { errors: createCommentErrors },
    reset: createCommentReset,
  } = useForm<CreateCommentFormData>({
    // @ts-ignore Todo:型エラー修正
    resolver: yupResolver(createCommentSchema),
    defaultValues: {
      messageCreate: '',
    },
  })

  const {
    control: editCommentControl,
    handleSubmit: editCommentHandleSubmit,
    formState: { errors: editCommentErrors },
    reset: editCommentReset,
  } = useForm<EditCommentFormData>({
    // @ts-ignore Todo:型エラー修正
    resolver: yupResolver(editCommentSchema),
    defaultValues: {
      messageEdit: '',
    },
  })

  const handleSendComment: SubmitHandler<CreateCommentFormData> = async ({ messageCreate }) => {
    try {
      await createComment({
        message: messageCreate,
        articleId: article?.id ?? 0,
        userId: user?.user_id ?? 0,
      })
      createCommentReset()
    } catch {
      console.log('作成に失敗しました')
    }
  }

  const handleClickEditComment = (commentID: number) => {
    setIsCommentEdit(true)
    setEditCommentID(commentID)
  }

  const handleSendEditComment: SubmitHandler<EditCommentFormData> = async ({ messageEdit }) => {
    try {
      await updateComment({
        commentId: editCommentID,
        message: messageEdit,
      })
      editCommentReset()
      setIsCommentEdit(false)
    } catch {
      console.log('更新に失敗しました')
    }
  }

  const handleClickDeleteComment = async (commentId: number) => {
    await deleteComment({ commentId })
  }

  const handleClickUpdateNice = async () => {
    await updateNice({ article_id: parseInt(id ?? ''), user_id: user?.user_id })
  }

  const isLike = article?.nices?.some((nice) => user?.user_id === nice.user_id)

  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography>article: {article?.id}</Typography>
          <Typography>title: {article?.title}</Typography>
          <Typography>contents: {article?.contents}</Typography>
          <Typography>created_at: {article?.createdAt}</Typography>
          <Typography>updated_at: {article?.updatedAt}</Typography>
          <Box onClick={handleClickUpdateNice}>{isLike ? <Favorite /> : <FavoriteBorder />}</Box>
          <Box>
            <Box component="form" onSubmit={createCommentHandleSubmit(handleSendComment)}>
              <Controller
                name="messageCreate"
                control={createCommentControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="コメント"
                    required
                    error={!!createCommentErrors.messageCreate}
                    helperText={createCommentErrors.messageCreate?.message}
                  />
                )}
              />
              <Button type="submit">送信</Button>
            </Box>
            <Typography>コメント一覧</Typography>
            {article?.comments ? (
              article.comments.map((comment) => (
                <Box key={comment.comment_id} display="flex">
                  {isCommentEdit && editCommentID === comment.comment_id ? (
                    <Box component="form" onSubmit={editCommentHandleSubmit(handleSendEditComment)}>
                      <Controller
                        name="messageEdit"
                        control={editCommentControl}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="コメント"
                            required
                            error={!!editCommentErrors.messageEdit}
                            helperText={editCommentErrors.messageEdit?.message}
                          />
                        )}
                      />
                      <Button type="submit">送信</Button>
                    </Box>
                  ) : (
                    <Box display="flex">
                      <Typography>
                        {comment.message} {comment.user_name}
                      </Typography>
                      {comment.user_id === user?.user_id && <Button onClick={() => handleClickEditComment(comment.comment_id)}>編集</Button>}
                      {comment.user_id === user?.user_id && <Button onClick={() => handleClickDeleteComment(comment.comment_id)}>削除</Button>}
                    </Box>
                  )}
                </Box>
              ))
            ) : (
              <Typography>コメントなし</Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}
