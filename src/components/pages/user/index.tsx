import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField, Typography } from '@mui/material'
import { setUser } from '@reducers/auth'
import { useUpdateUserNameMutation } from '@reducers/blogApi/injections/userApi'
import { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'store'
import { InferType, object, string } from 'yup'

const schema = object({
  userName: string().required('新しいユーザー名を入力してください'),
})

type FormData = InferType<typeof schema>

export const User: FC = () => {
  const { user } = useAppSelector((state) => state.Auth)
  const dispatch = useAppDispatch()
  const [isUserNametEdit, setIsUserNametEdit] = useState(false)
  const [updateUserName, isLoading] = useUpdateUserNameMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    // @ts-ignore Todo:型エラー修正
    resolver: yupResolver(schema),
    defaultValues: {
      userName: '',
    },
  })

  const handleEditUserName: SubmitHandler<FormData> = async ({ userName }) => {
    try {
      await updateUserName({
        userId: user?.userId ?? 0,
        userName: userName,
      })
      if (user) {
        dispatch(setUser({ ...user, userName }))
      }
    } catch {
      console.log('変更に失敗しました')
    }
    setIsUserNametEdit(false)
  }

  const handleClickEditUserName = () => {
    setIsUserNametEdit(true)
  }

  const handleClickCancelEditUserName = () => {
    setIsUserNametEdit(false)
  }

  return (
    <Box component="div">
      <Typography>ユーザー情報</Typography>
      {isUserNametEdit ? (
        <Box component="form" display="flex" onSubmit={handleSubmit(handleEditUserName)}>
          <Controller
            name="userName"
            control={control}
            render={({ field }) => <TextField {...field} label="ユーザー名" required error={!!errors.userName} helperText={errors.userName?.message} />}
          />
          <Button type="submit">変更</Button>
          <Button onClick={handleClickCancelEditUserName}>戻る</Button>
        </Box>
      ) : (
        <Box display="flex">
          <Typography>ユーザー名：{user?.userName}</Typography>
          <Button onClick={handleClickEditUserName}>編集</Button>
        </Box>
      )}
      <Typography>メールアドレス：{user?.email}</Typography>
      <Typography>登録日時：{user?.createdAt}</Typography>
      <Typography>更新日時：{user?.updatedAt}</Typography>
    </Box>
  )
}
