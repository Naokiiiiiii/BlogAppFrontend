import { Box } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

export const Home: FC = () => {
  return (
    <Box component="div">
      <Link to="/articles">記事一覧</Link>
      <Link to="/article/create">記事新規作成</Link>
    </Box>
  )
}
