import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { useAppSelector } from 'store'

export const User: FC = () => {
  const { user } = useAppSelector((state) => state.Auth)
  return (
    <Box component="div">
      <Typography>ユーザー情報</Typography>
      <Typography>ユーザー名：{user?.user_name}</Typography>
      <Typography>メールアドレス：{user?.email}</Typography>
      <Typography>登録日時：{user?.created_at}</Typography>
      <Typography>更新日時：{user?.updated_at}</Typography>
    </Box>
  )
}
