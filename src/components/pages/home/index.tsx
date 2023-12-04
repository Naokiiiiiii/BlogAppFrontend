import { Box, Button } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export const Home: FC = () => {
  const navigate = useNavigate()

  const handleClickTransition = (to: string) => {
    navigate(to)
  }

  return (
    <Box component="div">
      <Button onClick={() => handleClickTransition('/articles')}>記事一覧</Button>
      <Button onClick={() => handleClickTransition('/article/create')}>記事新規作成</Button>
    </Box>
  )
}
