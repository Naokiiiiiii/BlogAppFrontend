import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useGetArticleDetailQuery } from '@reducers/blogApi/injections/articleApi'
import { useCreateCommentMutation } from '@reducers/blogApi/injections/commentApi'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'store'
import { InferType, object, string } from 'yup'

const schema = object({
  message: string().required('コメントを入力してください'),
})

type FormData = InferType<typeof schema>

export const ArticleDetail: FC = () => {
  const { id } = useParams()
  const { data: article, isLoading } = useGetArticleDetailQuery({ article_id: Number(id) })
  const { user } = useAppSelector((state) => state.Auth)
  const [createComment] = useCreateCommentMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    // @ts-ignore Todo:型エラー修正
    resolver: yupResolver(schema),
    defaultValues: {
      message: '',
    },
  })

  const handleSendComment: SubmitHandler<FormData> = async ({ message }) => {
    try {
      await createComment({
        message,
        article_id: article?.id ?? 0,
        user_id: user?.user_id ?? 0,
      })
      reset()
    } catch {
      console.log('作成に失敗しました')
    }
  }

  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography>article: {article?.id}</Typography>
          <Typography>title: {article?.title}</Typography>
          <Typography>contents: {article?.contents}</Typography>
          <Typography>created_at: {article?.created_at}</Typography>
          <Typography>updated_at: {article?.updated_at}</Typography>
          <Box>
            <Box component="form" onSubmit={handleSubmit(handleSendComment)}>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="コメント" required error={!!errors.message} helperText={errors.message?.message} />
                )}
              />
              <Button type="submit">送信</Button>
            </Box>
            <Typography>コメント一覧</Typography>
            {article?.comments ? (
              article.comments.map((comment) => (
                <Box key={comment.comment_id}>
                  <Typography>
                    {comment.message} {comment.user_name}
                  </Typography>
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
