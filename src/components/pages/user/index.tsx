import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useAppSelector } from 'store'
import { InferType, object, string } from 'yup'

const schema = object({
  userName: string().required('新しいユーザー名を入力してください'),
})

type FormData = InferType<typeof schema>

export const User: FC = () => {
  const { user } = useAppSelector((state) => state.Auth)
  const [isUserNametEdit, setIsUserNametEdit] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: createCommentReset,
  } = useForm<FormData>({
    // @ts-ignore Todo:型エラー修正
    resolver: yupResolver(schema),
    defaultValues: {
      userName: '',
    },
  })

  const handleEditUserName: SubmitHandler<FormData> = async ({ userName }) => {
    console.log(userName)
    setIsUserNametEdit(false)
  }

  const handleClickEditUserName = () => {
    setIsUserNametEdit(true)
  }

  return (
    <Box component="div">
      <Typography>ユーザー情報</Typography>
      {isUserNametEdit ? (
        <Box component="form" onSubmit={handleSubmit(handleEditUserName)}>
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="ユーザー名" required error={!!errors.userName} helperText={errors.userName?.message} />
            )}
          />
          <Button type="submit">変更</Button>
        </Box>
      ) : (
        <Box display="flex">
          <Typography>ユーザー名：{user?.user_name}</Typography>
          <Button onClick={handleClickEditUserName}>編集</Button>
        </Box>
      )}
      <Typography>メールアドレス：{user?.email}</Typography>
      <Typography>登録日時：{user?.created_at}</Typography>
      <Typography>更新日時：{user?.updated_at}</Typography>
    </Box>
  )
}
