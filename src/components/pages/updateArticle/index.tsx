import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useUpdateArticleMutation } from '@reducers/blogApi/injections/articleApi'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { InferType, object, string } from 'yup'

const schema = object({
  title: string().required('タイトルを入力してください。'),
  contents: string().required('内容を入力してください。'),
})

type FormData = InferType<typeof schema>

export const UpdateArticle: FC = () => {
  const { id } = useParams()
  const [updateArticle, isLoading] = useUpdateArticleMutation()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    // @ts-ignore Todo:型エラー修正
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      contents: '',
    },
  })

  const handleUpdateArticle: SubmitHandler<FormData> = async ({ title, contents }) => {
    try {
      await updateArticle({
        articleId: parseInt(id ?? ''),
        title,
        contents,
      })
      navigate(`/articles/${id}`)
    } catch {
      console.log('更新に失敗しました')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleUpdateArticle)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => <TextField {...field} fullWidth label="タイトル" required error={!!errors.title} helperText={errors.title?.message} />}
      />
      <Controller
        name="contents"
        control={control}
        render={({ field }) => <TextField {...field} fullWidth label="コンテンツ" required error={!!errors.contents} helperText={errors.contents?.message} />}
      />
      <Button type="submit">作成</Button>
    </Box>
  )
}
